# =========================================
# Portfolio Backend
# =========================================

FROM node:22-alpine

WORKDIR /app


# Install dependencies first
# så Docker kan cache:a npm-installationen
COPY package*.json ./

RUN npm ci --omit=dev


# Copy backend source
COPY . .


# Render kommer att sätta PORT
ENV NODE_ENV=production

EXPOSE 4000


# Start backend
CMD ["npm", "start"]