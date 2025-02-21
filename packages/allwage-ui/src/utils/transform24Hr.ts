export const transform24Hr = (v: string) => {
  let value = v
  if (!value) {
    return { valid: true, value: '00:00' }
  }

  // :: | ::: | :::: | :::::
  if (value.replace(/[0-9]/g, '').length > 1) {
    return { valid: false, value }
  }

  if (value.length > 2 && value[value.length - 1] === ':') {
    value = value.replace(':', '')
  }
  if (value.replace(/[^0-9]/g, '').length > 4) {
    value = value.slice(0, 4)
  }

  switch (value.length) {
    case 1: {
      // : => fail
      if (isNaN(+value)) {
        return { valid: false, value }
      }
      // x => 0x:00
      return { valid: true, value: `0${value}:00` }
    }

    case 2: {
      // :x => fail
      if (isNaN(+value[0])) {
        return { valid: false, value }
        // x: => 0x:00
      } else if (isNaN(+value[1])) {
        return { valid: true, value: `${hour(value)}:00` }
      }
      // 0~24 => [00~24]:00
      return { valid: true, value: `${hour(value)}:00` }
    }

    case 3: {
      // :xx => fale
      if (isNaN(+value[0])) {
        return { valid: false, value }
        // x:x
      } else if (isNaN(+value[1])) {
        // 0:x => 0x:00
        if (+value[0] === 0) {
          return { valid: true, value: `${value[0]}${value[1]}:00` }
          // 1:x
        } else if (+value[0] === 1) {
          // 1:[6~9]
          if (+value[2] >= 6) {
            return { valid: true, value: `${value[0]}${value[2]}:00` }
          }
          //1:[0~5]
          return { valid: true, value: `0${value[0]}:${value[1]}0` }
        }
      }
      // xxx
      // 0xx
      if (+value[0] === 0) {
        return { valid: true, value: `${value[0]}${value[1]}:0${value[2]}` }
        // 1xx
      } else if (+value[0] === 1) {
        // 10x
        if (+value[1] === 0) {
          return { valid: true, value: `${hour(value[0])}:0${value[2]}` }
          // 1[6~9]x => 1[6~9]:0x
        } else if (+value[1] >= 6) {
          return { valid: true, value: `1${value[1]}:0${value[2]}` }
          // 1[0~5]x => 01:[0~5]x
        } else {
          return {
            valid: true,
            value: `${hour(value[0])}:${value[1]}${value[2]}`,
          }
        }
      } else if (+value[0] === 2) {
        // 2[6~9]x => fail
        if (+value[1] >= 6) {
          return { valid: false, value }
        }
        // 2[0~5]x => 02:[0~5]x
        return {
          valid: true,
          value: `${hour(value[0])}:${value[1]}${value[2]}`,
        }
      }
      // [3~9]xx => fail;
      return { valid: false, value }
    }

    case 4: {
      // :xxx => fale
      if (isNaN(+value[0])) {
        return { valid: false, value }
        // x:xx
      } else if (isNaN(+value[1])) {
        // 0:xx => 0x:0x
        if (+value[0] === 0) {
          return { valid: true, value: `${hour(value[2])}:0${value[3]}` }
          // 1:xx => 1x:0x
        } else if (+value[0] === 1) {
          // 1:[6~9]x => 1[6~9]:0x
          if (+value[2] >= 6) {
            return { valid: true, value: `1${value[2]}:0${value[3]}` }
          }
          // 1:[0~5]x => 01:[0~5]x
          return { valid: true, value: `01:${value[2]}${value[3]}` }
          // [2~9]:xx
        } else {
          // [2~9]:[6~9]x => fail
          if (+value[2] >= 6) {
            return { valid: false, value }
          }
          // [2~9]:[0~5]x => 0[2~9]:xx
          return {
            valid: true,
            value: `${hour(value[0])}:${value[2]}${value[3]}`,
          }
        }
        // xx:x
      } else if (isNaN(+value[2])) {
        // [0~1]x:x
        if (+value[0] < 2) {
          // [0~1][6~9]:x => [0~1][6~9]:0x
          if (+value[1] >= 6) {
            return {
              valid: true,
              value: `${value[0]}${value[1]}:0${value[3]}`,
            }
          }
          // [0~1][0~5]:x => 0[0~1]:[0~5]x
          return {
            valid: true,
            value: `0${value[0]}:${value[1]}${value[3]}`,
          }
          // [2~9]x:x
        } else {
          // [2~9][6~9]:x => fail
          if (+value[1] >= 6) {
            return {
              valid: false,
              value,
            }
          }
          // [2~9][0~5]:x => 0[2~9]:[0~5]x
          return {
            valid: true,
            value: `${hour(value[0])}:${value[1]}${value[3]}`,
          }
        }
        // xxx:
      }
      // [0~1]xxx
      if (+value[0] < 2) {
        // [0~1]x[0~5]x => 0x:[0~5]x
        if (+value[2] >= 6) {
          return {
            valid: true,
            value: `${value[0]}${value[1]}:00`,
          }
        }
        // [0~1]xxx => [0~1]x:xx
        return {
          valid: true,
          value: `${value[0]}${value[1]}:${value[2]}${value[3]}`,
        }
        // 2xxx
      } else if (+value[0] === 2) {
        // 2[0~3]xx
        if (+value[1] < 4) {
          // 2[0~3][6~9]x => 2[0~3]:00
          if (+value[2] >= 6) {
            return {
              valid: true,
              value: `${value[0]}${value[1]}:00`,
            }
          }
          // 2[0~3]xx => 2[0~3]:xx
          return {
            valid: true,
            value: `${value[0]}${value[1]}:${value[2]}${value[3]}`,
          }
          // 24xx => 00:00
        } else if (+value[1] === 4) {
          return { valid: true, value: `00:00` }
          // 2[5~9]xx => fail
        } else {
          return { valid: false, value }
        }
        // [3~9]xxx => fail
      } else {
        return { valid: false, value }
      }
    }
    case 5: {
      //:xxxx => fail
      if (isNaN(+value[0])) {
        return { valid: false, value }
        // x:xxx
      } else if (isNaN(+value[1])) {
        // [0~1]:xxx
        if (+value[0] < 2) {
          // [0~1]:x[6~9]x => [0~1]x:00
          if (+value[3] >= 6) {
            return { valid: true, value: `${value[0]}${value[2]}:00` }
          }
          // [0~1]:x[0~5]x => [0~1]x:[0~5]x
          return {
            valid: true,
            value: `${value[0]}${value[2]}:${value[3]}${value[4]}`,
          }
          // 2:xxx
        } else if (+value[0] === 2) {
          // 2:[0~3]xx
          if (+value[2] < 4) {
            // 2:[0~3][6~9]x => 2[0~3]:00
            if (+value[3] >= 6) {
              return { valid: true, value: `2${value[2]}:00` }
            }
            // 2:[0~3][0~5]x => 2[0~3]:[0~5]xx
            return {
              valid: true,
              value: `2${value[2]}:${value[3]}${value[4]}`,
            }
            // 2:[4]xx => 00:00
          } else if (+value[2] === 4) {
            return { valid: true, value: '00:00' }
          }
          // 2:[5~9]xx => fail
          return { valid: false, value }
        }
        // [3~9]:xxx => fail
        return { valid: false, value }
        // xx:xx
      } else if (isNaN(+value[2])) {
        // [0~1]x:xx
        if (+value[0] < 2) {
          // [0~1]x:[6~9]x => [0~1]x:00
          if (+value[3] >= 6) {
            return { valid: true, value: `${value[0]}${value[1]}:00` }
          }
          // [0~1]x:[0~5]x => [0~1]x:[0~5]x
          return {
            valid: true,
            value: `${value[0]}${value[1]}:${value[3]}${value[4]}`,
          }
          // 2x:xx
        } else if (+value[0] === 2) {
          // 2[5~9]:xx => fail
          if (+value[1] > 4) {
            return { valid: false, value }
            // 24:xx => 00:00
          } else if (+value[1] === 4) {
            return { valid: true, value: '00:00' }
            // 2[0~3]:xx
          } else {
            // 2[0~3]:[6~9]x => 2[0~3]:00
            if (+value[3] >= 6) {
              return { valid: true, value: `${value[0]}${value[1]}:00` }
            }
            // 2[0~3]:[0~5]x => 2[0~3]:[0~5]x
            return {
              valid: true,
              value: `${value[0]}${value[1]}:${value[3]}${value[4]}`,
            }
          }
        }
        // [3~9]x:xx => fail
        return { valid: false, value }
        // xxx:x
      } else if (isNaN(+value[3])) {
        //[0~1]xx:x
        if (+value[0] < 2) {
          //[0~1]x[6~9]:x => [0~1]x:00
          if (+value[2] >= 6) {
            return { valid: true, value: `${value[0]}${value[1]}:00` }
          }
          //[0~1]x[0~5]:x => [0~1]x:[0~5]x
          return {
            valid: true,
            value: `${value[0]}${value[1]}:${value[2]}${value[4]}`,
          }
          // 2xx:x
        } else if (+value[0] === 2) {
          // 2[0~3]x:x
          if (+value[1] < 4) {
            // 2[0~3][6~9]:x => 2[0~3]:00
            return { valid: true, value: `${value[0]}${value[1]}:00` }
            // 24x:x => 00:00
          } else if (+value[1] === 4) {
            return { valid: true, value: '00:00' }
          }
          // 2[5~9]x:x => fail
          return { valid: false, value }
        }
        // [3~9]xx:x => fail
        return { valid: false, value }
        // xxxx:
      }
    }
  }
}

const hour = (value: string) => {
  const int = parseInt(value.replace(/[^0-9]/g, ''))

  if (int < 10) {
    return '0' + int.toString()
  }

  if (int >= 24) return '00'

  return int.toString()
}
