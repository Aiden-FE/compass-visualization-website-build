# rush build
# rush deploy --overwrite
# docker build -t compass-vwb .
# docker run -p 3000:3000 compass-vwb

FROM node:18.15.0-slim
MAINTAINER Aiden_FE <Aiden_FE@outlook.com>

ENV NODE_ENV production

ARG WORKDIR_DIR=/root/compass-vwb

WORKDIR ${WORKDIR_DIR}

COPY ./common/deploy ${WORKDIR_DIR}

EXPOSE 13000

ENV PORT 13000

ENV HOSTNAME localhost

CMD ["node", "apps/vwb-designer/dist/server.js"]
