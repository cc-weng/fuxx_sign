from flask import Flask, request
import json
import fuxx_sign
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources=r'/*')

@app.post('/sign')
def controller():
    raw = request.get_json()
    code = raw.get('code')
    name = raw.get('name')
    choose = raw.get('choose', 1)
    if not code or not name:
        return json.dumps({
            'code': 400,
            'data': None,
            'msg': '请填写完整的name和code'
        })
    
    return json.dumps(fuxx_sign.fuxx(code, name, choose))


# app.run(host='0.0.0.0', port=os.environ.get('PORT', 83))