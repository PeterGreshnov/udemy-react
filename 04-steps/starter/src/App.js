import { useState } from "react";

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

export default function App() {
    return (
        <div>
            <Steps />
            <StepMessage step={1}>
                <p>some content</p>
                <p>🚀</p>
            </StepMessage>
            <StepMessage step={2}>
                <p>another content</p>
                <p>🎰</p>
            </StepMessage>
        </div>
    );
}

function Steps() {
    const [step, setStep] = useState(1); // hook react function
    const [isOpen, setIsOpen] = useState(true);
    // const [test, setTest] = useState({ name: "Peter" });

    // const step = 1;
    const handlePervious = function () {
        if (step > 1) setStep((s) => s - 1);
        // setTest({ name: "Peter" });
    };

    const handleNext = function () {
        if (step < 3) setStep((s) => s + 1);
        // step = step + 1; // that would not trigger UI update;

        // Bad practice:
        // test.name = "John";
        // setTest({ name: "Garry" });
    };

    return (
        <div>
            <button
                className="close"
                onClick={() => setIsOpen((is) => !is)}
            >
                &times;
            </button>
            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? "active" : null}>1</div>
                        <div className={step >= 2 ? "active" : null}>2</div>
                        <div className={step >= 3 ? "active" : null}>3</div>
                    </div>

                    <StepMessage step={step}>
                        {messages[step - 1]}
                        <div className="buttons">
                            <Button
                                textColor="#333"
                                backgroundColor="#e7e7e7"
                                onClickHandler={() =>
                                    alert(`learn how to ${messages[step - 1]}`)
                                }
                            >
                                <span>ℹ</span> Info
                            </Button>
                        </div>
                    </StepMessage>

                    <div className="buttons">
                        <Button
                            textColor="#fff"
                            backgroundColor="#7950f2"
                            onClickHandler={handlePervious}
                        >
                            <span>⏪</span> Previous
                        </Button>
                        <Button
                            textColor="#fff"
                            backgroundColor="#7950f2"
                            onClickHandler={handleNext}
                        >
                            Next <span>⏩</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function StepMessage({ step, children }) {
    return (
        <div className="message">
            <h3>Step {step}:</h3>
            {children}
        </div>
    );
}

function Button({ textColor, backgroundColor, onClickHandler, children }) {
    return (
        <button
            style={{
                backgroundColor: backgroundColor,
                color: textColor,
            }}
            onClick={onClickHandler}
        >
            {children}
        </button>
    );
}
