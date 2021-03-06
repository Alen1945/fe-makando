import axios from 'axios'
import storage from '../store'

function submitData (dataUrl, dataForm) {
  return new Promise((resolve, reject) => {
    const config = {}
    const token = storage.store.getState().dataUser.token
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` }
    }
    const url = process.env.REACT_APP_API_URL + dataUrl
    axios.post(url, dataForm, config).then(result => {
      resolve(result)
    }).catch((e) => {
      reject(e)
    })
  })
}
export default submitData
