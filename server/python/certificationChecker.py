import pandas as pd
import requests
from bs4 import BeautifulSoup


def newest_Cert(certs, dates, certName):
    # Makes list of where dates of same cert are
    indices = [i for i, x in enumerate(certs) if certName in x]
    # returns min date of indices
   if len(indices) > 1:
        newDates = [dates[x] for x in indices]
        return min(newDates)
    elif len(indices) == 1:
        return dates[indices[0]]
    else:
        return None


def monthsRemaining(expire, current):
    return (expire.year - current.year) * 12 + expire.month - current.month


class webscraper:

    def get_Data(self, ids):
        url = "https://www.lifesaving.bc.ca/_PartialEUmembers"
        header = {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-lauguage": "en-GB,en-US;q=0.9,en;q=0.8",
            "content-length": "30",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "origin": "https://www.lifesaving.bc.ca",
            "referer": "https://www.lifesaving.bc.ca/members",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
            "x-requested-with": "XMLHttpRequest"
        }
        allCerts = [
            "National Lifeguard - Pool",
            "National Lifeguard - Waterpark",
            "CPR-C",
            "Standard First Aid",
            "AED",
            "Lifesaving Instructor"]

        namelist = []
        for i, id in enumerate(ids):
            cleanDates = []
            cleanCerts = []

            payload = {"memberid": id, "current_only": "1"}
            s = requests.Session()
            s.headers = header
            r = s.post(url, data=payload)

            # gets the certs and names in ml-3 div
            try:
                soup = BeautifulSoup(r.content, "html.parser").find(
                    id='DivIdToPrint')
                name = soup.find(class_='ml-3')
                name = name.text
                name = name.replace("  ", " ")
                namelist.append(name)
                dirtyCerts = soup.find_all(class_="col-md-6")
            except:
                print("Error with id: " + id)
                continue

            # https://stackoverflow.com/questions/4664850/how-to-find-all-occurrences-of-a-substring
            # Replaces certs with cleaner names
            for certs in dirtyCerts:
                certs = certs.text
                certs = certs.strip()
                certs = certs.replace(
                    'CPR - Level "C" /AED - valid 3 yr', "CPR-C/AED")
                certs = certs.replace(
                    "Standard First Aid (OFA 1 Equivalent)", "Standard First Aid")
                cleanCerts.append(certs)

            # Gets all the dates from the col-md-3 div
            dirtyDates = soup.find_all(class_="col-md-3")
            for dates in dirtyDates:
                dates = dates.text
                dates = dates.strip()
                cleanDates.append(dates)
            cleanCerts.pop(0)
            cleanDates.pop(0)

            # Checks and returns newest certs
            rowData = []
            # rowDataTime = []
            for certNames in allCerts:
                dateToKeep = newest_Cert(cleanCerts, cleanDates, certNames)
                rowData.append(dateToKeep)

            columnNames = allCerts

            rowData.insert(0, name)
            # rowDataTime.insert(0, name)
            columnNames.insert(0, "Name")
            if i == 0:
                self.allStaff = pd.DataFrame([rowData], columns=list(columnNames), index=[id])
            else:
                if columnNames[0] == 'Name' and columnNames[1] == 'Name':
                    columnNames.pop(0)
                    rowData.pop(1)

                person = pd.DataFrame([rowData], columns=list(columnNames), index=[id])

                self.allStaff = self.allStaff.loc[~self.allStaff.index.duplicated(
                    keep='first')]
                self.allStaff = pd.concat(
                    [self.allStaff, person], ignore_index=False)


    def get_Cols(self):
        return list(self.allStaff.columns.values)

    def get_Rows(self):
        return list(self.allStaff.values.tolist())

    def to_Csv(self):
        self.allStaff.to_csv("./certificationCSVs/staffCert.txt", index=True)


if __name__ == "__main__":
    ids = [
        "FRE96F",
        "BEG92L",
        "CHN98W"
    ]
    tester = webscraper()
    tester.get_Data(ids)
    print(tester.allStaff)
    print(tester.allStaff.to_json(orient='records'))
