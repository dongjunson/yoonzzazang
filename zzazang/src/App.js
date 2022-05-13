import React, { useEffect,useState } from 'react';
import Disqus from 'disqus-react';
import axios from 'axios';
import moment from 'moment';
import './css/base.scss';
import logo from './image/logo.png';

async function callZZazangApi(){
    return await axios.get("https://nainom.com/yoon_timetables")
}

function App() {

    let timeTable;
    const disqusShortname = 'https-dongjunson-github-io-yoonzzazang';
    const disqusConfig = {
        url: "https://dongjunson.github.io/yoonzzazang/",
        identifier: "zzazang-time-table",
        title: "출근시간표"
    }

    const [isList, setList] = useState([]);

    const List = () =>  isList.map((item, key) =>
        <li key = {key}>
            <b className={item.late ? 'is-late' : ''}>{item.late ? '지각' : '정상출근'}</b>
            <span>
                {item.date}

                <b>{item.go_to_work}</b>
                <b>{item.leave_work}</b>

            </span>
            <b className={item.leave_early ? 'is-early' : ''}>{item.leave_early ? '조기퇴근' : '정상퇴근'}</b>
        </li>);

    useEffect(() => {
        callZZazangApi().then(result => {
            const { data } =result;
            setList( data['yoon_timetables'].map( (item) => {
                return {
                    ...item
                }
            }));
        })
            .catch(error => console.error(error))
    }, []);


  return (
    <div className="App">
        <header>
            <img src={logo} alt="Logo" />
        </header>
        <div className="main-list">
            <ul>
                <List />
            </ul>
        </div>
      <div className="comment-box">
          <Disqus.DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
          />
      </div>
    </div>
  );
}

export default App;
