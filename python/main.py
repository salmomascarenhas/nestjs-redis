import json
from time import sleep
from redis import Redis


fila = Redis(host="localhost", port=6379, db=0)


def conectar_servico():
    redis_up = False

    while not redis_up:
        try:
            fila.ping()
            redis_up = True

        except Exception as e:
            print("Redis ainda nao esta up. Dormindo...")
            sleep(5)


def servico():
    while True:
        recebido = json.loads(fila.blpop("sender")[1])
        print(f"recebido: {recebido['amostra']}")
        sleep(10)


if __name__ == '__main__':
    conectar_servico()
    print("iniciando servico")
    servico()