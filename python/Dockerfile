FROM python:3.8

RUN apt-get update && apt-get -y install redis-server

WORKDIR /python
COPY . /python
RUN pip install -r requirements.txt

RUN ["chmod", "+x", "start_python.sh"]
ENTRYPOINT ["./start_python.sh"]
