// Hooks come from react library
// We import just like we would anything else
// from react. The two hooks we'll be using are
// useState and useEffect.
import React, { useState, useEffect } from 'react'
import Layout from '../shared/Layout'
// Counter will have a button that can be clicked
// to increase the count.There will also be a
// button to reset count. Counter, as you can see
// is a function component. This means we will use
// hooks to make use of state.
const Counter = () => {
  console.log('useEffect', useEffect)
  // use hooks here.
  // To access state in a function component, we call
  // useState. useState requires two things, an initial
  // value and an updater function.
  // our piece of state will be count, which means we'll call
  // our updater function, setCount
  // We pass the initial value of the count to the useState function
  const [count, setCount] = useState(0)
  const [donut, setDonut] = useState('chocolate')
  // we used these to check out our hooks for a second
  // console.log('this is count: ', count)
  // console.log('this is setCount: ', setCount)
  // function to increase count
  const increaseCount = () => {
    // this is fine for setting state (count) to a predetermined value
    // setCount(1)
    // for an actual counter, we want to use the initial value and
    // increase that by one. You might think we do that like this:
    // setCount(count + 1)
    // according to the react lifecycle, this doesn't work the best because it
    // doesnt set state immediately. This is fine for something simple like this,
    // but breaks down for more complex things, for instance, if I wanted
    // to increase by two, using this syntax:
    // setCount(count + 1)
    // setCount(count + 1)
    // The above syntax is going to run both calls based on state when we called
    // so it's saying, if count is zero, make the count 1 and runs that logic twice
    // making the count 1 both times. that's because of the way this updater function
    // works. best practice, is to make your count increase by previous count,
    // and that syntax looks like this:
    setCount(prevCount => prevCount + 1)
    // using this syntax allows mutiple state setting functions to run effectively
    // one after another. It's important to remember, these updater functions
    // do not merge state, they replace the current state with the passed value
  }
  // when we want to set the count to a value that doesnt depend on the
  // previous value, we can just pass a value to setCount
  const resetCount = () => {
    setCount(0)
  }
  // useEffect --> takes the place of componentDidMount, componentDidUpdate, and componentDidUnmount
  // called the effect hook
  // requires one (mostly two) things: a callback function and a dependency array
  // the dep array not always required.
  // the dep array is what the hook is dependent on, aka, what will trigger it to run
  // the below hook will recreate compDidMount
  // runs on the first render
  useEffect(() => {
    console.log('First render only')
  }, [])
  // This effect hook takes the place of componentDidMount AND componentDidUpdate
  // runs on first render, and any time the count changes
  // This is because count is inside the dependency array, which triggers the useEffect hook
  useEffect(() => {
    console.log('first render and count change')
  }, [count])
  // an effect hook with no dep array will be called after every render
  useEffect(() => {
    console.log('every render')
  })
  useEffect(() => {
    console.log('The Donut has sprinkles')
  }, [donut])
  useEffect(() => {
    console.log('Something was updated, either count or donut')
  }, [count, donut])
  // this effect hook will act like componentDidUnmount
  // the way to do this is to return a 'cleanup' function
  useEffect(() => {
    console.log('some effect xyz')
    // an effect can reaturn a cleanup function
    // cleanup functions run two different times
    // 1. when the component is unmounted
    // 2. before the second and following state updates/renders
    // adding an empty dep array makes it so the cleanup function only
    // runs when the component is unmounted,
    // this is because it doesn't depend on any piece of state that could
    // cause it to be reapplied
    return () => {
      console.log('cleaning xyz')
    }
  }, [])
  const addSprinkles = () => {
    setDonut(prevDonut => prevDonut + ' with sprinkles')
  }
  return (
    <Layout>
      <h1>Counter</h1>
      <h2>Count: {count}</h2>
      <button onClick={increaseCount}>Increase Count</button>
      <button onClick={resetCount}>Reset Count</button>
      <h5>Donut is: {donut}</h5>
      <button onClick={addSprinkles}>Add Sprinkles</button>
    </Layout>
  )
}

export default Counter
