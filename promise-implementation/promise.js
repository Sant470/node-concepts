/*

    A tutorial followed from the link 'https://www.mauriciopoppe.com/notes/computer-science/computation/promises/',

    Improvement includes:-
        1. Methods, all and race
        2. Async stack traces

*/


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

        /*
            To observe changes in the state of the promise (and the fulfillment value or rejection reason)
            we use the then method, the method receives 2 parameters,
            an onFulfilled function and
            an onRejected function,
            the rules to invoke these functions are the following:

            when the promise is in a FULFILLED state the onFulfilled function will
            be called with the promise's fulfillment value e.g. onFulfilled(value)

            when the promise is in a REJECTED state the onRejected function will
            be called with the promise's rejection reason e.g. onRejected(reason)
        */

        then(onFulfilled, onRejected) {
            handleResolved(this, onFulfilled, onRejected);
        }
    }

    function handleResolved(promise, onFulfilled, onRejected) {
        const func = promise.state === FULFILLED ? onFulfilled : onRejected
        func(promise.value);
    }

    // fullfill with a value
    function fulfill(promise, value) {
        promise.state = FULFILLED;
        promise.value = value;
    }

    // reject with a reason
    function reject(promise, reason) {
        promise.state = REJECTED;
        promise.value = reason;
    }

    // creates the fulfill/reject functions that are arguments of the executor
    function doResolve(promise, executor) {
        // Transitions are supposed to be one way, once the promise enter into FULFILLED or REJECTED state,
        // it should not change it's state
        let called = false;
        function wrapFullfill(value) {
            // Ensure it's not getting called twice or called after calling wrapReject
            if(called) return;
            called = true;
            fullfill(promise, value);
        }

        function wrapReject(reason) {
            // Ensure it's not getting called twice or called after calling wrapFullfill
            if(called) return;
            called = true;
            reject(promise, reason);
        }
        // If the execution of executor fails, the promise should move into REJECTED state,
        // try catch black ensure that wrapReject is called in case of exception
        try {
            executor(wrapFullfill, wrapReject);
        } catch(ex) {
            wrapReject(ex);
        }
    }

}
