FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Moscow

RUN apt-get update && apt-get upgrade
RUN apt-get install -y sudo nano nodejs python3 npm && \
    apt-get clean

EXPOSE 4000 8080 443 80 5432

VOLUME /home/sandbox

WORKDIR /home/sandbox

CMD ["/bin/bash"]