/*
 * @Author: WJ23000 624473119@qq.com
 * @Date: 2023-09-26 11:30:07
 * @LastEditors: WJ23000 624473119@qq.com
 * @LastEditTime: 2023-09-26 11:31:05
 * @FilePath: \medical-examination\src\utils\version.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const compareVersion = (v1, v2) => {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len)
    v1.push('0')

  while (v2.length < len)
    v2.push('0')

  for (let i = 0; i < len; i++) {
    const num1 = Number.parseInt(v1[i])
    const num2 = Number.parseInt(v2[i])

    if (num1 > num2)
      return 1

    else if (num1 < num2)
      return -1
  }
  return 0
}
export default compareVersion
