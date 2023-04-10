document.getElementById('toggle-mode').addEventListener('click', async () => {
    await window.darkMode.toggle()
})
  
document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
})