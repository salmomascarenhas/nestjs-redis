import json
from time import sleep
from redis import Redis


fila = Redis(host="localhost", port=6379, db=0)


def servico():
    while True:
        recebido = json.loads(fila.blpop("sender")[1])
        print(f"recebido: {recebido['amostra']}")
        sleep(10)


if __name__ == '__main__':
    print("iniciando servico")
    servico()
