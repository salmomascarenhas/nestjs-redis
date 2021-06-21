FROM python:3.9

COPY . /python
WORKDIR /python
RUN pip install -r requirements.txt

RUN ["python", "main.py"]
