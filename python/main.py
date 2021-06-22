from time import sleep
import redis

fila = redis.Redis(host="cache", port=6379, db=0)


if __name__ == '__main__':
    print("iniciando servico")
    while True:
        print('salve salve, ta no loop maluco')
        sleep(5)
