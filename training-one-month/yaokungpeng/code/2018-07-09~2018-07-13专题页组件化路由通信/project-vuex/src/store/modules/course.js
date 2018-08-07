// initial state

const state =  {
  modalFlag:0, 
  modalType:0, 
  searchInfo:{
    searchRule:"",
    searchText:""
  },
  courseMark: {
    whichPeriod:0, 
    whichCourse:0
  }, 
  selectedItem: {
    period:"", 
    teacher:"", 
    name:"", 
    time:"", 
    date:"", 
    timeFrom:"", 
    timeTo:""
  }, 
  courseInfos:[ {
      period:"一期", 
      teacher:"于晴", 
      course:[ {
          name:"从寓言故事读文言文", 
          time:"7月1日 18:30-21:00"
        },  {
          name:"从神话故事读文言文", 
          time:"7月2日 18:30-21:00"
        },  {
          name:"从历史故事读文言文", 
          time:"7月3日 18:30-21:00"
        }
      ]
    },  {
      period:"二期", 
      teacher:"杨蕴天", 
      course:[ {
          name:"从寓言故事读文言文", 
          time:"7月4日 18:30-21:00"
        },  {
          name:"从神话故事读文言文", 
          time:"7月5日 18:30-21:00"
        },  {
          name:"从历史故事读文言文", 
          time:"7月6日 18:30-21:00"
        }
      ]
    },  {
      period:"三期", 
      teacher:"潘欢欢", 
      course:[ {
          name:"从寓言故事读文言文", 
          time:"7月7日 18:30-21:00"
        },  {
          name:"从神话故事读文言文", 
          time:"7月8日 18:30-21:00"
        },  {
          name:"从历史故事读文言文", 
          time:"7月9日 18:30-21:00"
        }
      ]
    },  {
      period:"四期", 
      teacher:"刘梦瑶", 
      course:[ {
          name:"从寓言故事读文言文", 
          time:"7月10日 18:30-21:00"
        },  {
          name:"从神话故事读文言文", 
          time:"7月11日 18:30-21:00"
        },  {
          name:"从历史故事读文言文", 
          time:"7月12日 18:30-21:00"
        }
      ]
    }
  ]
}

// getters
const getters =  {
  getModalFlag(state) {return state.modalFlag}, 
  getModalType(state) {return state.modalType}, 
  getSearchInfo(state) {return state.searchInfo},
  getCourseMark(state) {return state.courseMark}, 
  getSelectedItem(state) {return state.selectedItem}, 
  getCourseInfos(state) {return state.courseInfos},
  getFormatTime(state){ 
    let dateTemp = state.selectedItem.date.split("-");
    return `${parseInt(dateTemp[1])}月${parseInt(dateTemp[2])}日 ${state.selectedItem.timeFrom}-${state.selectedItem.timeTo}`;
  },
  getCourseInfoResult(state){
    let result;
    let objTemp = JSON.stringify(state.courseInfos);
    result = JSON.parse(objTemp);
    for (let scheduleIndex = 0; scheduleIndex < result.length; scheduleIndex++) {
      // 期数或者老师名称搜到相同直接保留
      if (result[scheduleIndex].period.indexOf(state.searchInfo.searchText) !== -1 ||
       result[scheduleIndex].teacher.indexOf(state.searchInfo.searchText) !== -1) {
        continue;
      }
      for (let lineIndex = 0; lineIndex < result[scheduleIndex].course.length; lineIndex++) {
          // 同时没有匹配就删除该项,任意一个有匹配不删除
          if (
                  result[scheduleIndex].course[lineIndex].name.indexOf(
                      state.searchInfo.searchText
                  ) === -1 &&
                  result[scheduleIndex].course[lineIndex].time.indexOf(
                      state.searchInfo.searchText
                  ) === -1
              ) {
              result[scheduleIndex].course.splice(lineIndex, 1);
              lineIndex--;
          }
      }
    }
    return result;
  }
}

// actions 执行简单逻辑并触发(分发)mutation进行具体业务处理
const actions =  {
  modalHide({commit}){
    commit('modalHide');
  },
  modalShow({commit},params){
    commit('modalShowInit', params);
    commit('selectedItemInit',params);
  },
  deleteCourse( {commit}) {
    commit('modalHide');
    commit('deleteCourse'); 
  },
  fixCourse({commit,getters}){
    state.selectedItem.time = getters.getFormatTime;
    commit('modalHide');
    commit('fixCourse');
  },
  addCourse({commit,getters}){
    let infosComplete = !!state.selectedItem.period&&!!state.selectedItem.teacher&&!!state.selectedItem.name&&!!state.selectedItem.date&&!!state.selectedItem.timeFrom&&!!state.selectedItem.timeTo;
    console.log(infosComplete);
    if (!infosComplete) {
      alert('请输入完整信息');
    } else{
      state.selectedItem.time = getters.getFormatTime;
      commit('modalHide');
      commit('addCourse');
    }
  },
  searchCourse(){
  
  }
}

// mutations ，我的理解，用于内部action调用(commit)的事件回调(方法)
const mutations =  {
  modalHide(state){
    state.modalFlag = false;
  },
  modalShowInit(state,params) {
    state.modalType = params.type; 
    state.modalFlag =  true;
    state.courseMark.whichPeriod = params.whichPeriod; 
    state.courseMark.whichCourse = params.whichCourse; 
  }, 
  selectedItemInit(state,params){
    state.selectedItem.period = params.type === 2 ? state.courseInfos[state.courseMark.whichPeriod].period : ""; 
    state.selectedItem.teacher = params.type === 2 ? state.courseInfos[state.courseMark.whichPeriod].teacher : ""; 
    state.selectedItem.name = params.type === 2 ? state.courseInfos[state.courseMark.whichPeriod].course[state.courseMark.whichCourse].name : ""; 
    state.selectedItem.time = params.type === 2 ? state.courseInfos[state.courseMark.whichPeriod].course[state.courseMark.whichCourse].time : ""; 
    state.selectedItem.date = "";
    state.selectedItem.timeFrom = "";
    state.selectedItem.timeTo = "";
    if(params.type === 2){
      let dateTemp = state.selectedItem.time.split(" ");
      let timeTemp = dateTemp[1].split("-");
      let regExp = /(\d+)月(\d+)日/g;
      let fromTo = regExp.exec(dateTemp[0]);
      state.selectedItem.date = `${new Date().getFullYear()}-${fromTo[1].length > 1 ? fromTo[1] : "0" + fromTo[1]}-${fromTo[2].length > 1 ? fromTo[2] : "0" + fromTo[2]}`;
      state.selectedItem.timeFrom = timeTemp[0];
      state.selectedItem.timeTo = timeTemp[1];
    }
  },
  deleteCourse(state) {
  state.courseInfos[state.courseMark.whichPeriod].course.splice(state.courseMark.whichCourse, 1); 
  },
  fixCourse(state){
    state.courseInfos[state.courseMark.whichPeriod].period = state.selectedItem.period;
    state.courseInfos[state.courseMark.whichPeriod].teacher = state.selectedItem.teacher;
    state.courseInfos[state.courseMark.whichPeriod].course[state.courseMark.whichCourse].name = state.selectedItem.name;
    state.courseInfos[state.courseMark.whichPeriod].course[state.courseMark.whichCourse].time = state.selectedItem.time;

  },
  addCourse(state){
    for (let index = 0; index < state.courseInfos.length; index++) {
      if (state.courseInfos[index].period === state.selectedItem.period) {
        let objTemp = {};
        objTemp.name = state.selectedItem.name;
        objTemp.time = state.selectedItem.time;
        state.courseInfos[index].course.push(objTemp);
        break;
      }
      if (index === state.courseInfos.length - 1) {
        let objTemp = {};
        objTemp.period = state.selectedItem.period;
        objTemp.teacher = state.selectedItem.teacher;
        objTemp.course = [{
          name:state.selectedItem.name,
          time:state.selectedItem.time
        }];
        state.courseInfos.push(objTemp);
        break;
      }
    }
  }
}

export default {
  namespaced:true, 
  state, 
  getters, 
  actions, 
mutations}
