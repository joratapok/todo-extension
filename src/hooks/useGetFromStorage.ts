import { useState } from 'react'

export const useGetFromStorage = <T>() => {
  const [data, setData] = useState<T | undefined>(undefined)

  chrome.storage.sync.get(['todo'], function(result) {
    setData(JSON.parse(result.todo))
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(`KEY - ${key}  oldValue - ${oldValue}`)
      setData(JSON.parse(newValue))
    }
  })
  console.log(data)
  return data
}
