export const getDataFromLocalStorage =(key)=>{
    const data = localStorage.getItem(key)
    return JSON.parse(data) || [];
}

// Set data to localStorage by key
export const setDataToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error writing localStorage:", error);
    }
  };