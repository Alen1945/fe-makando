import axios from 'axios'
import cookie from 'js-cookie'
function deleteData (dataUrl, dataForm) {
  return new Promise((resolve, reject) => {
    const config = {}
    if (cookie.get('tokenm4k4nd0')) {
      config.headers = { Authorization: `Bearer ${cookie.get('tokenm4k4nd0')}` }
    }
    const url = process.env.REACT_APP_API_URL + dataUrl
    axios.delete(url, config).then(result => {
      resolve(result)
    }).catch((e) => {
      reject(e)
    })
  })
}
export default deleteData