// possible states

const PENDING = 'PENDING';
const REJECTED = 'REJECTED';
const FULFILLED = 'FULFILLED';

const APromise{
    //To make the transition the Promise constructor receives a function called executor
    // the executor is called immediately with two functions fulfill and reject that when called perform the state transition:
    constructor(executor) {
        // initial state
        this.state = PENDING;
        // the fulfillment value or rejection reason is mapped internally to `value`
        // initially the promise doesn't have a value

        // call the executor
        doResolve(this, executor);
    }

    // fullfill with a value
    function fulfill(promise, value) {
        promise.state = FULFILLED;
        promise.value = value;
    }

    // reject with a reason
    function reject(promise, reason) {
        promise.state = REJECTED;
        promise.reason =
    }

    // creates the fulfill/reject functions that are arguments of the executor
    function doResolve(promise, executor) {
        function wrapFullfill(value) {
            fullfill(promise, value);
        }

        function wrapReject(reason) {
            reject(promise, reason);
        }
        executor(wrapFullfill, wrapReject);
    }

}
