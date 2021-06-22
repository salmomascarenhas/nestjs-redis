from typing import Dict
from time import sleep
import json
import redis

fila = redis.Redis(host="cache", port=6379, db=0)

def get_hash(hash_id: int) -> None:

    # Parsear campo que é objeto
    data = fila.hget(f'bull:queue:{hash_id}', 'data')
    print(json.loads(data)['data'])

    # Parsear campo que é string
    name = fila.hget(f'bull:queue:{hash_id}', 'name')
    print(name.decode('utf8'))


if __name__ == '__main__':
    print("iniciando servico")
    get_hash(1)
    while True:
        sleep(5)
