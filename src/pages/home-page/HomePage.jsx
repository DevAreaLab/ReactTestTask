
import { useState, useEffect } from 'react'
import { Textarea, Button, Table, Snackbar } from '@mui/joy';
import { JsonServiceClient, Inspect } from '@servicestack/client'
import CheckIcon from '@mui/icons-material/Check';
import ReportIcon from '@mui/icons-material/Report';
import ErrorIcon from '@mui/icons-material/Error';
import { SyncRpkiRecords } from './dtos.mjs'

import classes from './HomePage.module.css'

const HomePage = () => {
	const [prefix, setPrefix] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  const [notification, setNotification] =  useState({type: 'neutral', message: 'Text'})

  // table
  const [table, setTable] = useState(null)
  const client = new JsonServiceClient('https://networklist.dgtlnet.com')

  const formattingPrefixList = () => {
		return prefix.replace(/\s+/g, ';')
	}

  const arrayToString = (array) => {
    return `[ ${array.join(", ")} ]`;
  }

  const checkStatus = ({status, message}) => {
    switch(status) {
      case 'Ok':
      case 'Synced':
        return <CheckIcon  sx={{ color: 'green' }} />
        break;
      case 'NeedSync': 
        return <span>Need Sync</span>
        break; 
      case 'Blacklisted': 
        return <div className={classes.boxBlacklist}><ReportIcon  sx={{ color: 'black' }} /><span>Network blacklisted</span></div>
      case 'Error': 
        return <div className={classes.boxError}><ErrorIcon  sx={{ color:  'red' }} /><span>{message}</span></div>
        break; 
    }
  }

  const checkSync = (status) => {
    return status === 'NeedSync'
  }

  const handleSubmit = event => {
		event.preventDefault()
    if(prefix.trim() !== '') {
      setIsSubmitting(true)
      syncAll();
    } else {
      setNotification({type: 'danger', message: 'Fill in the field!'})
      setOpen(true)
    }
	}

	const handleTextChange = event => {
		setPrefix(event.target.value)
		// console.log('Text: ', formattingPrefixList())
	}

  const fetch = (prefixList, processSync) => {
    return new Promise((resolve, reject) => {
      client.api(
        new SyncRpkiRecords({
          prefixList,
          processSync
        })
      ).then((response) => {
        if(response.error) {
          reject(response.error);
        }
        resolve(response.response.result);
      }).catch((error) => {
        reject(error)
      })
    })
	}

  const syncAll = () => {
    fetch(formattingPrefixList(), false)
    .then((response)=>{
      setTable(response.map((obj, index) => ({ ...obj, id: index + 1, sync: false })))
      setPrefix('');
      setNotification({type: 'success', message: 'Sync is correct!'})
      setOpen(true)
    }).catch((error)=>{
      setNotification({type: 'danger', message: `code: ${error.errorCode}; message: ${error.message}`})
      setOpen(true)
    }).finally(()=>{
      setIsSubmitting(false)
    })
  }

  const sync = (id, prefix) => {
    // loading button
    setTable(table.map((item)=> {
      return item.id === id ? {...item, sync: true} : item 
    }))

    fetch(prefix, true)
    .then((response) => {
      setTable(table.map((item) => {
        return item.id === id ? { id, ...response[0], sync:false} : item
      }))
      setNotification({type: 'success', message: 'Sync is correct!'})
      setOpen(true)
    }).catch((error) => { 
      setTable(table.map((item) => {
        return item.id === id ? {...item, sync: false} : item;
      }))
      setNotification({type: 'danger', message: 'Error response!'})
      setOpen(true)
    })
  }
  
  return (
    <main className={classes.main}>
      <Snackbar autoHideDuration={3000}
      color={notification.type}
      open={open}
      size="sm"
      onClose={(event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      }}
      >
          {notification.message}
      </Snackbar>
      <div className={classes.centerBox}>
        <div className={classes.title}>Form request</div>
        <form className={classes.inputForm} onSubmit={handleSubmit}>
            <Textarea
            name="Solid"
            placeholder="Prefix"
            size="sm"
            value={prefix}
            onChange={handleTextChange}
            sx={{
              width: '100%',
              fontSize: '0.825rem',
              '&::before': {
                boxShadow: 'none',
              },
              '&:focus-within': {
                borderColor: '#e36858',
              },
            }}
            />
          <Button
            type='submit'
            size="sm" 
            loading={isSubmitting}
            sx={{
              fontSize: '0.725rem',
              fontWeight: '500',
              width: '280px',
              backgroundColor: '#e36858',
              transition: 'all 0.25s cubic-bezier(0.65, 0, 0.35, 1)',
              '&:hover': {
                backgroundColor: '#e94d39',
              },
              '&.MuiButton-loading': {
                backgroundColor: '#CDD7E1'
              },
              '& .MuiCircularProgress-root': {
                '--CircularProgress-progressColor' : '#e94d39',
              }
            }}>
              {isSubmitting ? '' : 'Sync'}
          </Button>
        </form>
        <div className={classes.tableResponse}>
          {table !== null &&
          <Table tableLayout="fixed" sx={{
            backgroundColor: 'white',
            borderRadius: '0.6rem',
            padding: '.6rem 0.7rem 0.5rem',
            '& thead ': {
              backgroundColor: 'transparent',
              'tr': {
                backgroundColor: 'transparent',
                'th' : {
                  backgroundColor: '#e94d39bb',
                  color: 'white',
                  '&:first-of-type': {
                    borderRadius: '0.4rem 0 0 0.4rem'
                  },
                  '&:last-child': {
                    borderRadius: '0 0.4rem 0.4rem 0'
                  }
                }
              }
            },
            '& tbody': {
              fontSize: '0.665rem',
              fontWeight: '600'
            }
          }}>
            <thead>
              <tr>
                <th style={{ width: 100 }}>Id</th>
                <th style={{ width: 100 }}>Prefix</th>
                <th style={{ width: 100 }}>ROAS</th>
                <th style={{ width: 100 }}>RPKI</th>
                <th style={{ textAlign: 'center', width: 100 }}>Status</th>
                <th style={{ textAlign: 'center', width: 100 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {table !== null && table.map((row) => (
                <tr  key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.prefix}</td>
                  <td>{arrayToString(row.roas)}</td>
                  <td>{arrayToString(row.rpki)}</td>
                  <td style={{ textAlign: 'center' }}>{checkStatus(row)}</td>
                  <td style={{ textAlign: 'center' }}>{checkSync(row.status) &&
                    <Button variant="soft"
                    size="sm"
                    loading={row.sync}
                    sx={{
                      fontSize: '0.725rem',
                      fontWeight: '500',
                      transition: 'all 0.25s cubic-bezier(0.65, 0, 0.35, 1)',
                      '&.MuiButton-loading': {
                        backgroundColor: '#E3EFFB'
                      },
                    }}
                    onClick={()=>sync(row.id, row.prefix)}
                    >
                      Sync
                    </Button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          }
        </div>
      </div>
    </main>
  )
}

export default HomePage