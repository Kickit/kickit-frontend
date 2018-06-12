import React from 'react'
import ReactDOM from 'react-dom'

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }

  const testStorage =  new LocalStorageMock

  it('Utils: LocalStorageMock class constructor', () => {
    expect(testStorage.store).toEqual({})
  })

  it('Utils: LocalStorageMock class set and get work', () => {
    testStorage.setItem('test', 'test')
    expect(testStorage.getItem('test')).toBe('test')
  })

  it('Utils: LocalStorageMock class removeItem works', () => {
    testStorage.removeItem('test')
    expect(testStorage.getItem('test')).toBe(null)
  })

  it('Utils: LocalStorageMock class removeItem works', () => {
    testStorage.setItem('test', 'test')
    testStorage.clear()
    expect(testStorage.store).toEqual({})
  })
  
  export default LocalStorageMock