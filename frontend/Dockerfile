# Stage 1: Install dependencies
# -----------------------------
FROM node:18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546de021255cd2b30834/18/alpine to see supported alpine versions
WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json* ./
# For yarn or pnpm, use one of the following:
# COPY package.json yarn.lock ./
# COPY package.json pnpm-lock.yaml ./


# Install dependencies
RUN npm ci
# For yarn or pnpm, use one of the following:
# RUN yarn install --frozen-lockfile
# RUN pnpm install --frozen-lockfile


# Stage 2: Build the application
# ------------------------------
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the source code
COPY . .

# Set Next.js telemetry to disabled
# Uncomment the following line if you want to disable telemetry during build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js application
RUN npm run build
# For yarn or pnpm, use one of the following:
# RUN yarn build
# RUN pnpm build


# Stage 3: Production image
# -------------------------
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV production
# Uncomment the following line if you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets from the 'builder' stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# If you have a custom server.js file, you would copy it here
# COPY --from=builder /app/server.js ./server.js

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app/.next

# Switch to the non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set the host to 0.0.0.0 to be accessible from outside the container
ENV HOSTNAME "0.0.0.0"

# Start the Next.js server
# The default start script in Next.js is "next start"
CMD ["npm", "start"]
# For yarn or pnpm, use one of the following:
# CMD ["yarn", "start"]
# CMD ["pnpm", "start"]
