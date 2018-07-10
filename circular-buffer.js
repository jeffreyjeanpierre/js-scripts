class CircularBuffer {
	constructor(capacity) {
		this._items = []
		this._capacity = typeof(capacity) == 'number' ? capacity : 1;
		this.top;
		this.bottom;
    }

    get capacity() { return this._capacity }
    get _capacity() { return this._capacity }

    get count() { return this._self.length; }
    get items() { return this._items }
    
	write(item) {
		switch(this._items.length < this._capacity) {			
            case true:
                this._items.push(item)
				break
            default:
				this._items.shift() // will shift AND assign at once
				this._items.push(item)
				break
		}
        return this._items
	}
	
    get top() { return this.items[0] }

    get bottom() { return this._items[this.items.length -1] }

    read() {
    	// remove the next item in the _self array
        return this.items.shift()
	}
	
    readAndEnqueue(item) {
		let currentVal = this.read()
		this.enqueue(item)
		return currentVal
	}
}