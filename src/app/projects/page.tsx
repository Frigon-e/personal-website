import Image from "next/image";

const Projects = [
  {
    title: 'Ultimate TicTacToe',
    href: '/projects/tictactoe',
    description:
      'This implementation of a Ultimate TicTacToe was originally made in Python then ported to golang for performance.\
    It has a AI that uses minimax to play against the player. It was able to make it to a gold rank on Codingames.com',
    imageUrl:
      '/static/TicTacToeBoard.png',

  },
  {
    title: 'Battleship',
    href: '#',
    description:
      'This Battleship AI is able to win in 44.1 moves on average per 100,000 games. It was made in Java for a school assignment.\
    The average of the class was apx. 47-50 moves.',
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',

  },
  {
    title: 'Lifesaving BC/Yukon Cert Checker',
    href: '#',
    description:
      'This is a application that I made at my previous work to check peoples life guarding certifications. \
    Then putting the certifications into a CSV to later be put into a execl spreadsheet',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',

  },
]

export default function Page() {
  return (
      <div className="px-6 pt-16 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text pb-1 text-3xl font-bold tracking-tight text-transparent sm:text-4xl">Available Projects</h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-zinc-400 sm:mt-4">
              These are projects that have been successfully ported and hosted or are soon to be live. More are being made available and will be added soon.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-fit lg:grid-cols-3">
            {Projects.map((post) => (
              <div key={post.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                  <Image className="h-48 w-full object-cover" width={500} height={500} src={post.imageUrl} alt="" />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-zinc-800/90 p-6">
                  <div className="flex-1">
                    <a href={post.href} className="mt-2 block">
                      <p className="bg-gradient-to-tr from-pink-500 to-rose-500 bg-clip-text text-xl font-bold text-transparent">{post.title}</p>
                      <p className="mt-3 text-base text-zinc-400">{post.description}</p>
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
