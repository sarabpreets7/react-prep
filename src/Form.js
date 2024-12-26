import { useEffect,useState } from "react";



export default function Form(){

    const [tab,setTab] = useState(1);

    const[formData ,setFormData] = useState({
        "Profile":{'age':'','email':''},
        "Interest":{'hobbies':[]},
        "Settings":{'notifications':''}
    })
    const tabs = ['Profile','Interest','Settings']


    const handleInputChange =(tabIdx,key,value)=>{

        setFormData((prevData)=>{
            return(
                {...prevData,

                [tabs[tabIdx]]:{

                    ...prevData[tabs[tabIdx]],
                    [key]:value
                }
                }
            )
        })

        console.log(formData);
    }

    return(
        <div>

            {tab == 0 && <ProfileTab onChange={handleInputChange} data={formData.profile}/>}

            {tab == 1 && <InterestTab  onChange={handleInputChange} data = {formData.Interest}/>}

            {tab == 2 && <SettingTab  onChange={handleInputChange} data = {formData.Settings}/>}

        </div>
    )
}




const ProfileTab =(props)=>{

    return(
        <div>
            <h1>Profile</h1>

            <div>
                <h4>age</h4>
                <input onKeyUp={(e)=>{props.onChange(0,'age',e.target.value)}} type="text"></input>
            </div>

            <div>
                <h4>email</h4>
                <input onKeyUp={(e)=>{props.onChange(0,'email',e.target.value)}} type="text"></input>
            </div>
        </div>
    )

}

const InterestTab = (props)=>{

    const hobbies = ['gaming','travelling','music','coding','dancing']

    const handleHobbies = (hobby)=>{
        // const hobby = e.target;
        console.log(hobby,props.data.hobbies);
        const newHobbies = props.data.hobbies.includes(hobby)?
        props.data.hobbies.filter((currHobby)=>{
            return currHobby != hobby;
        }):[...props.data.hobbies,hobby]

        props.onChange(1,'hobbies',newHobbies);
    }
    return(
        <div>
            <h1>Interest</h1>

            <div>
                <h4>hobbies</h4>
                <div>
                    {hobbies.map((item,idx)=>{
                        return(< div key={idx}>
                        <span>{item}</span>
                            <input type="checkbox" onChange={()=>handleHobbies(item)} value={props.data.hobbies.includes(item)} />
                            <br></br>
                            </div>
                        )
                    })}
                </div>
                {/* <select id="multi-select" name="options" multiple>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                </select> */}
            </div>
        </div>
    )
}

const SettingTab = (props)=>{

    return(
        <div>
            <h1>Settings</h1>

            <div>
                <h4>Notifications Toggle</h4>
                <input onChange={(e)=>{props.onChange(2,'notifications',e.target.checked)}} value={props.data.notifications} type="checkbox"/>
            </div>
        </div>
    )
}