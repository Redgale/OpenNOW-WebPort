FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# If Vite generated the index under a nested path (e.g. dist/src/renderer/index.html),
# copy it to the nginx root so the site is served at '/'.
RUN if [ -f /usr/share/nginx/html/src/renderer/index.html ]; then \
			cp /usr/share/nginx/html/src/renderer/index.html /usr/share/nginx/html/index.html ; \
		fi
EXPOSE 8080
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
