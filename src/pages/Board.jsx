import React, { use } from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

import List from '../components/list';

import '../styles/Board.css';
import '../assets/fonts/css/fontello.css';

const Board = () => {
  const { currentUser } = useContext(AuthContext);
  const { boardId } = useParams();

  const [lists, setLists] = useState([]);
  const [users, setUsers] = useState([]);
  const [boardinfo, setBoardinfo] = useState({});

  const [manage, setManage] = useState(false);
  const [team, setTeam] = useState(false);
  const [share, setShare] = useState(false);
  const [addprompt, setAddprompt] = useState(false);
  const [renameprompt, setRenameprompt] = useState(false);

  const fetchBoardInfo = async () => {
    await axios.get(`http://localhost:3000/board/info/${boardId}`, { withCredentials: true })
      .then((resp) => {
        setBoardinfo(resp.data[0]);
      }).catch((err) => {
        console.error('Error fetching data:', err);
      });
  }

  const fetchUserData = async () => {
    await axios.get(`http://localhost:3000/board/users/${boardId}`, { withCredentials: true })
      .then((resp) => {
        setUsers(resp.data);
      }).catch((err) => {
        console.error('Error fetching user data:', err);
      });
  }

  const fetchBoardData = async () => {
    await axios.get(`http://localhost:3000/board/lists/${boardId}`, { withCredentials: true })
      .then((resp) => {
        setLists(resp.data);
        return fetchUserData() && fetchBoardInfo();
      }).catch((err) => {
        console.error('Error fetching board data:', err);
      });
  }

  const onaddList = async (name) => {
    const str = name.get('name');
    if (str == '') {
      return;
    }

    await axios.post(`http://localhost:3000/list/add/${boardId}`, { title: str }, { withCredentials: true })
      .then(() => {
        fetchBoardData();
      }).catch((err) => {
        console.error('Error while adding a list:', err);
      });
  }

  const onRenameBoard = async (name) => {
    const str = name.get('name');
    if (str == '') {
      return;
    }
    await axios.put(`http://localhost:3000/board/rename/${boardId}`, { name: str }, { withCredentials: true })
      .then(() => {
        fetchBoardData();
      }).catch((err) => {
        console.error('Error while renaming board:', err);
      });
  }

  const onRemoveBoard = async () => {
    await axios.delete(`http://localhost:3000/board/remove/${boardId}`, { withCredentials: true })
      .then(() => {
        window.location.href = '/dashboard';
      }).catch((err) => {
        console.log(err);
        console.error('Error while removing board:', err);
      });
  }

  const onRemoveList = async (id) => {
    await axios.delete(`http://localhost:3000/list/remove/${id}`, { withCredentials: true })
      .then(() => {
        fetchBoardData();
      }).catch((err) => {
        console.error('Error while removin a list:', err);
      });
  }

  const onAddTask = async (id, name) => {
    if (name == '') {
      return;
    }

    await axios.post(`http://localhost:3000/task/add/${id}`, { title: name }, { withCredentials: true })
      .then(() => {
        fetchBoardData();
      }).catch((err) => {
        console.error('Error while adding a list:', err);
      });
  }

  const onRemoveTask = async (id) => {
    await axios.delete(`http://localhost:3000/task/remove/${id}`, { withCredentials: true })
      .then(() => {
        fetchBoardData();
      }).catch((err) => {
        console.error('Error while adding a list:', err);
      });
  }

  const onUpdateTask = async (id, name, status) => {
    await axios.put(`http://localhost:3000/task/state/${id}`, { title: name, status: status }, { withCredentials: true })
      .then(() => {
        fetchBoardData();
      }).catch((err) => {
        console.error('Error while adding a list:', err);
      });
  }

  useEffect(() => {
    if (!boardId) {
      window.location.href = '/dashboard';
    } else if (currentUser === null) {
      window.location.href = '/';
    }
    fetchBoardData();
  }, [boardId]);

  return (
    <div className="board-container">
      <aside className="sidebar">
        <h3 className="sidebar-title">{boardinfo.name}</h3>
        <hr className='separator' />
        <div className="sidebar-links">
          <button onClick={(e) => { e.preventDefault(); setManage(!manage); }}>Manage<i className='icon-angle-down'></i></button>
          <div className={manage === true ? 'dropdown-open' : 'dropdown'}>
            <button onClick={(e) => { e.preventDefault(); setRenameprompt(!renameprompt); }}>Rename board</button>
            {renameprompt &&
              <form action={onRenameBoard}>
                <input name='name' type='text' />
              </form>
            }
            <button className='danger' onClick={(e) => { e.preventDefault(); onRemoveBoard(); }}>Delete board</button>
          </div>
          <button onClick={(e) => { e.preventDefault(); setTeam(!team); }}>Team<i className='icon-angle-down'></i></button>
          <div className={team === true ? 'dropdown-open' : 'dropdown'}>
            {users.map((user, index) => (
              <div className='user-record' key={index}>
                <p className='user-avatar' style={{ backgroundColor: user.color }}>{user.username[0]}</p>
                {user.username}
              </div>
            ))}
          </div>
          <button onClick={(e) => { e.preventDefault(); setShare(!share); }}>Share board<i className='icon-angle-down'></i></button>
          <div className={share === true ? 'dropdown-open' : 'dropdown'}>
            <div className='share'>
              <p className='share-notice'>Share this code to let others join your board:</p>
              <p className='share-box'>{boardinfo.inv_code}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="kanban-board">
        {lists.map((list) => (
          <List props={list} onUpdateTask={onUpdateTask} onAddTask={onAddTask} onRemoveList={onRemoveList} onRemoveTask={onRemoveTask} key={list.id} />
        ))}
        <div className='add-list'>
          <a className="add-button" onClick={(e) => { e.preventDefault(); setAddprompt(!addprompt); }}>+ Add new list ...</a>
          {addprompt &&
            <form action={onaddList}>
              <input name='name' type='text' />
            </form>
          }
        </div>
      </main>
    </div>
  );
};

export default Board;
