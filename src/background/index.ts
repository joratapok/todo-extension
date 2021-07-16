console.log('background script')

const setTodoInStorage = (newTodo: string, currentStorage: Array<string> | undefined) => {
  let newStorage: Array<string> = []
  if (currentStorage !== undefined) {
    newStorage = currentStorage.slice()
  }
  newStorage.push(newTodo)
  chrome.storage.sync.set({todo: JSON.stringify(newStorage)}, function() {});
}

const removeTodoFromStorage = (removeIndex: number, currentStorage: Array<string>) => {
  const newStorage = currentStorage.filter((el, index) => index !== removeIndex)
  chrome.storage.sync.set({todo: JSON.stringify(newStorage)}, function() {});
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.todo) {
      chrome.storage.sync.get(['todo'], function(result) {
        setTodoInStorage(request.todo, JSON.parse(result.todo))
      });
    }
    if (request.removeTodo !== undefined) {
      chrome.storage.sync.get(['todo'], function(result) {
        removeTodoFromStorage(request.removeTodo, JSON.parse(result.todo))
      });
    }

  },
)




//chrome.storage.sync.set({todo: JSON.stringify(['1','2','3'])}, function() {});
// chrome.storage.sync.get(['todo'], function(result) {
//   console.log(`CURRENT STORAGE JSON PARSE - ${JSON.parse(result.todo)}`)
// });
