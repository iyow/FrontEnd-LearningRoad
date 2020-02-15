import concurrent.futures
import requests
import threading
import time


def download_one(url):
    resp = requests.get(url)
    print('Read {} from {}'.format(len(resp.content), url))


def map_download_all(sites):
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        executor.map(download_one, sites)

def submit_download_all(sites):
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        to_do = []
        for site in sites:
            future = executor.submit(download_one, site)
            to_do.append(future)
           
        for future in concurrent.futures.as_completed(to_do):
            print(future.result())
            # future.result()

def main():
    sites = [
        'http://c.biancheng.net',
        'http://c.biancheng.net/c',
        'http://c.biancheng.net/python'
    ]
    start_time = time.perf_counter()
    submit_download_all(sites)
    end_time = time.perf_counter()
    print('Download {} sites in {} seconds'.format(
        len(sites), end_time - start_time))


if __name__ == '__main__':
    main()
