# Fuck Sign (c) ccweng

import requests
import json
import time
import datetime
import pytz

def fuxx(code: str, name: str, choose: int = 1):
    headers = {
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        'Referer': 'https://servicewechat.com/wx694dda7a5f554038/2/page-frame.html'
    }
    tz = pytz.timezone('Asia/Shanghai')
    pivot: datetime = tz.localize(datetime.datetime(2024, 2, 26))
    current: datetime = tz.localize(datetime.datetime.now())
    diff: int = (current - pivot).days
    week: int = (diff // 7) + 1
    
    signForm = {
        'r': 'sign/WxSign',
        'sr_id': '0', # 课程的id
        'code': code, # 学号
        'name': name, # 姓名
        'week': week,
        'type': '正常签到',
        's_type': ''
    }

    wxInit = {
        'r': 'user/WxInit',
        'code': code
    }
    

    urlList = ['http://gdyjydrd.com/sign-in-management-system-back/index.php',  'https://shenhailao.com/sign-in-management-system-back/index.php']
    url = urlList[choose]
    # response = requests.get(url, params=loginForm, headers=headers)
    # cookies = response.cookies
    response = requests.get(url, params=wxInit, headers=headers)
    signList = []
    try:
        signList = json.loads(response.text).get('data', dict()).get('signData', list())
    except:
        print(f'[{time.ctime()}] {name}: 解析签到列表失败')
        return {
            'code': 500,
            'msg': '解析签到列表错误',
            'data': None
        }
    print(f'[{time.ctime()}] {name}: 签到列表 {signList}')
    if len(signList) == 0:
        print(f'[{time.ctime()}] {name}: 没有待签到课程')
        return { 
            'code': 404,
            'msg': '没有待签到课程',
            'data': None
        }
    signTarget = signList[0]
    signForm['sr_id'] = signTarget['sr_id']
    signForm['week'] = signTarget.get('week', week)
    if ('a_start' in signTarget):
        signForm['s_type'] = '活动'
    else:
        signForm['s_type'] = '课程'
        
    print(f'[{time.ctime()}] {name}: 签到表单 {signForm}')
    response = requests.get(url, params=signForm, headers=headers)
    resObj = dict()
    try:
        resObj = json.loads(response.text)
    except:
        print(f'[{time.ctime()}] {name}: 解析签到结果失败[{signTarget.get("name", "")}]')
        return {
            'code': 500,
            'msg': '解析签到结果失败，请检查学号姓名',
            'data': None
        }
    if resObj.get('code', 0) == "200":
        print(f'[{time.ctime()}] {name}: 签到成功[{signTarget.get("name", "")}]')   
        return {
            'code': 200,
            'msg': 'success',
            'data': f'{signTarget.get("name", "")}签到成功'
        }
    print(f'[{time.ctime()}] {name}: 签到失败[{signTarget.get("name", "")}]\n{resObj}')
    return {
        'code': 500,
        'msg': '签到失败',
        'data': None
    }