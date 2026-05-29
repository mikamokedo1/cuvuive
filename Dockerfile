# ══════════════════════════════════════════════════════════════
# Dockerfile (Production Runner Only)
# Used by deploy.sh — expects pre-built .next/standalone from local build
# Runs both Next.js (port 3000) and Voice Relay (port 8081)
# ══════════════════════════════════════════════════════════════
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static
COPY --chown=nextjs:nodejs public ./public

# Entrypoint script to run both processes
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./

USER nextjs

EXPOSE 3000 8081

ENV PORT=3000
# set hostname to localhost
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "docker-entrypoint.sh"]
