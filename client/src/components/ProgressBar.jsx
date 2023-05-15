const ProgressBar = ({progress}) => {
    const colors = ["rgb(255, 50, 87)",
                    "rgb(31, 100, 200)",
                    "rgb(128, 25, 39)",
                    "rgb(99, 200, 161)"]

    const random = colors[Math.floor(Math.random() * colors.length)]
    return (
        <div className="outer-bar">
            <div className="inner-bar" style={{width:`${progress}%`,backgroundColor: random}}>
                
            </div>
        </div>
    )
}
export default ProgressBar;