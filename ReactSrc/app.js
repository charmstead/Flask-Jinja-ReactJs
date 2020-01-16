import { makeChart,getDatasetChart } from './HighChart'
import Preloader from './custom_component/Preloader/Preloader'
import  './app.css'


const app = () => {

    const data = document.querySelector('script#sensorData').innerHTML;
    const [sensorData, setSensorData] = React.useState(JSON.parse(data));
    const [rendered, setRendered] = React.useState(false);
    const [sensor, setSensor] = React.useState(()=>{
        const hash = window.location.hash;
        if(hash){
            return hash.replace('#','');
        }
        return 0;
    });

    const chartRef = React.useRef();
    const chartRef1 = React.useRef();

    React.useEffect(() => {
        makeChart(sensorData, chartRef.current,setRendered);
        getDatasetChart(sensorData,sensor,chartRef1.current)
    }, [])

    const processMainChart=(i)=>{
        setSensor(i)
        getDatasetChart(sensorData,i,chartRef1.current)
    }


    return (
        <div>
            {rendered ? null: <Preloader/>}
            <div ref={chartRef} id="chartRef" className={["uk-margin-auto"].join(" ")}></div>
            <nav className="uk-width-1-2@s uk-margin-auto">
                <div className="uk-text-center">
                    <ul className={["uk-nav uk-nav-default ListInline"].join(" ")}>
                        {
                            new Array(10).fill(null).map((val, i) => {
                                if(i==0){
                                   return <li key={i} className={i==sensor?"uk-active":""}><a href={`#${i}`} onClick={()=>processMainChart(i)}>Sensor{i}</a></li>
                                }
                                return <li key={i} className={i==sensor?"uk-active":""} ><a href={`#${i}`} onClick={()=>processMainChart(i)}>Sensor{i}</a></li>
                            })
                        }
                    </ul>
                </div>
            </nav>
            <div ref={chartRef1}  className={["uk-margin-auto"].join(" ")}></div>

        </div>
    );

}

export default app;
