import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations, getQuickSortAnimations, getHeapSortAnimations, getBubbleSortAnimations} from '../Algorithms/Algorithms.js';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            NUMBER_OF_ARRAY_BARS: 100,
            ANIMATION_SPEED_MS: 5,
            SORTING: false,
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < this.state.NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomInt(5, 650));
        }
        this.setState({array});
    }

    mergeSort() {
        this.setState({ SORTING: true}, () => {
            const animations = getMergeSortAnimations(this.state.array);
            for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const [action, barOneIdx, barTwoIdxOrHeight] = animations[i];
            
                if (action === "compareA" || action === "compareB") {
                    const color = action === "compareA" ? 'red' : 'pink';
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * this.state.ANIMATION_SPEED_MS);
                } else if (action === "overwrite") {
                    setTimeout(() => {
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${barTwoIdxOrHeight}px`;
                    }, i * this.state.ANIMATION_SPEED_MS);
                } else if (action === "sorted") {
                    setTimeout(() => {
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.backgroundColor = 'red';
                    }, i * this.state.ANIMATION_SPEED_MS);
                }
            }
            setTimeout(() => {
                this.resetBarColors();
                this.setState({ SORTING: false});
            }, (animations.length * this.state.ANIMATION_SPEED_MS) + 1000);
        });
    }
        
    quickSort() {
        this.setState({ SORTING: true}, () => {
            const animations = getQuickSortAnimations(this.state.array);
            for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const [type, barOneIndex, barTwoIndex] = animations[i];
                
                if (type === "compareA" || type === "compareB") {
                    const color = (type === "compareA") ? 'red' : 'pink';
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * this.state.ANIMATION_SPEED_MS);
                } else if (type === "sorted") {
                    const barStyle = arrayBars[barOneIndex].style;
                    setTimeout(() => {
                        barStyle.backgroundColor = 'red';
                    }, i * this.state.ANIMATION_SPEED_MS);
                } else {
                    const [barIndex, newHeight] = animations[i];
                    setTimeout(() => {
                        arrayBars[barIndex].style.height = `${newHeight}px`;
                    }, i * this.state.ANIMATION_SPEED_MS);
                }
            }
            setTimeout(() => {
                this.resetBarColors();
                this.setState({ SORTING: false});
            }, (animations.length * this.state.ANIMATION_SPEED_MS) + 1000);
        });
    }
     
    heapSort() {
        this.setState({ SORTING: true}, () => {
            const animations = getHeapSortAnimations(this.state.array);
            for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const isColorChange = animations[i][0] === "compareA" || animations[i][0] === "compareB";
                        
                if (isColorChange) {
                    const [comparison, barOneIndex, barTwoIndex] = animations[i];
                    const color = (comparison === "compareA") ? 'red' : 'pink';
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * this.state.ANIMATION_SPEED_MS);
                } else {
                    const [barIndex, newHeight] = animations[i];
                    setTimeout(() => {
                        arrayBars[barIndex].style.height = `${newHeight}px`;
                    }, i * this.state.ANIMATION_SPEED_MS);
                }
            }
            setTimeout(() => {
                this.resetBarColors();
                this.setState({ SORTING: false});
            }, (animations.length * this.state.ANIMATION_SPEED_MS) + 1000);
        });
    }

    bubbleSort() {
        this.setState({ SORTING: true}, () => {
            const animations = getBubbleSortAnimations(this.state.array);
            for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const [type, barOneIndex, barTwoIndex] = animations[i];
                    
                if (type === "compareA" || type === "compareB") {
                    const color = (type === "compareA") ? 'red' : 'pink';
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * this.state.ANIMATION_SPEED_MS);
                } else if (type === "sorted") {
                    const barStyle = arrayBars[barOneIndex].style;
                    setTimeout(() => {
                        barStyle.backgroundColor = 'red';
                    }, i * this.state.ANIMATION_SPEED_MS);
                } else {
                    const [barIndex, newHeight] = animations[i];
                    setTimeout(() => {
                        arrayBars[barIndex].style.height = `${newHeight}px`;
                    }, i * this.state.ANIMATION_SPEED_MS);
                }
            }
            setTimeout(() => {
                this.resetBarColors();
                this.setState({ SORTING: false});
            }, (animations.length * this.state.ANIMATION_SPEED_MS) + 1000);
        });
    } 

    handleSliderChange = (event) => {
        const NUMBER_OF_ARRAY_BARS = parseInt(event.target.value, 10);
        this.setState({ NUMBER_OF_ARRAY_BARS }, () => this.resetArray());
    };

    handleSpeedChange = (event) => {
        const ANIMATION_SPEED_MS = parseInt(event.target.value, 10);
        this.setState({ ANIMATION_SPEED_MS });
    };

    render() {
        const {array, SORTING} = this.state;
        const barWidth = 2 + (1 - Math.pow((this.state.NUMBER_OF_ARRAY_BARS - 4) / (200 - 4), 0.15)) * (100 - 2); //formula inspired by linear interpolation used to dynamically change the bar width
        
        return (
            <div>
                <div className="button-bar">
                    <button onClick={() => this.resetArray()} disabled = {SORTING}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()} disabled = {SORTING}>Merge Sort</button>
                    <button onClick={() => this.quickSort()} disabled = {SORTING}>Quick Sort</button>
                    <button onClick={() => this.heapSort()} disabled = {SORTING}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()} disabled = {SORTING}>Bubble Sort</button>
                    <div className = "width">
                        <input
                            type = "range"
                            min = "4"
                            max = "200"
                            value = {this.state.NUMBER_OF_ARRAY_BARS}
                            onChange = {this.handleSliderChange}
                            disabled = {SORTING}
                        />
                        <p>Array Size: <span>{this.state.NUMBER_OF_ARRAY_BARS}</span></p>
                    </div>
                    <div className = "speed">
                        <input
                            type = "range"
                            min = "1"
                            max = "200"
                            value = {this.state.ANIMATION_SPEED_MS}
                            onChange = {this.handleSpeedChange}
                            disabled = {SORTING}
                        />   
                        <p>Speed (MS): <span>{this.state.ANIMATION_SPEED_MS}</span></p>
                    </div>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div 
                        className="array-bar" 
                        key={idx}
                        style = {{
                        height: `${value}px`,
                        width: `${barWidth}px`
                        }}>
                        </div>
                    ))}
                </div>
            </div>
        );
    } 

    resetBarColors() {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = 'pink';
        }
    }
}
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
}