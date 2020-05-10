//index.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
      data: {
            feed: [],
            feed_length: 0,
            userInfo: '',
            like_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/like.png?sign=f385b6a9ec6bd2fd8eef4c15dd7f60e0&t=1587886758',
            liked_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/liked.png?sign=6c22cc8c58c58c132eb82cf3c107cec6&t=1588600467',
            comment_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/comment%20.png?sign=1d444df91712179f1bbcc3fcbdde87eb&t=1587886769',
            camera_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/camera.png?sign=d102a3e17157cf4dd3966a02ba01a648&t=1587886776',
            more_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/more.png?sign=83161b2337cd14966522d1ae7b7fe7ea&t=1587887690',
            search_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/search_black.png?sign=a9f9c7136a7416d5e91d1f75e1ca212c&t=1587887012',
            shownav: false,
            hideModal: true,
            registerName: '',
            currentPage: 0,
            refresher: false,
            liked: ()=>{return this.liked_url}
      },
      //事件处理函数
      bindItemTap: function() {
            wx.navigateTo({
                  url: '../answer/answer'
            })
      },
      bindQueTap: function() {
            wx.navigateTo({
                  url: '../question/question'
            })
      },

      showIndexContent: function(keyword=null){

            var that = this;
            if (this.data.user_id != app.tourist_flag){
                  wx.cloud.callFunction({
                        name: "userinfo",
                        data: {
                              user_id: this.data.user_id
                        },
                        success: res=>{
                              // console.log(res);
                              that.setData({
                                    avatar: res.result.data[0].avatar
                              });
                        },
                        fail: console.log
                  });
            }

            wx.cloud.callFunction({
                  name: "index_user_info",
                  data: {
                        user_id: this.data.user_id,
                        page: this.data.currentPage,
                        keyword: keyword
                  },
                  success: res=>{
                        var list = res.result.list
                        var listLength = res.result.list.length
                        // console.log(res);
                        that.setData({
                              feed: list,
                              feed_length: listLength
                        });
                        for (let i = 0; i < listLength; i++) {
                              var thisPictures = util.objToArray(list[i].pictures)
                              wx.cloud.getTempFileURL({
                                    fileList: thisPictures,
                                    success: res => {
                                          var fileList = res.fileList
                                          var picturesName = 'feed[' + i + '].pictures'
                                          that.setData({
                                                [picturesName]: fileList
                                          })
                                    }
                              })
                        }
                        wx.hideLoading({})
                        that.setData({
                              refresher: false
                        })
                  }
            });
      },

      onLoad: function() {
            wx.showLoading({})
            var that = this;
            this.setData({
                  user_id: app.tourist_flag
            })
            
            //////////////////////////////////////////////新用户注册////////////////////////////////////////////
            wx.login({
                  success (res) {
                    if (res.code) {
                      //发起网络请求
                      wx.cloud.callFunction({
                            name: 'get_openid',
                            data: {
                                  code: res.code
                            },
                            success: res=>{
                              //     console.log(res);
                              wx.cloud.callFunction({
                                    name: 'map_user_id',
                                    data: {
                                          open_id: res.result.openid
                                    },
                                    success: int_res=>{
                                          if (int_res.result.data.length !== 0){
                                                that.setData({
                                                      user_id: int_res.result.data[0]._id
                                                })                                    
                                          }
                                          that.showIndexContent()
                                    },
                                    fail: console.log
                              })
                            },
                            fail: err=>{
                                  console.log('登录失败！');
                                  console.log(err);
                            }
                      })
                    } else {
                      console.log('登录失败！' + res.errMsg)
                    }
                  }
                })
            ////////////////////////////////////////////////////////////////////////////////////////////////
      },

      onShow: function () {
            
      },

      /**
       * 跳转到用户个人页面
       */
      toPersonal: function (e) {
            var user_id = e.currentTarget.id;
            var host = e.currentTarget.dataset.host;
            // console.log(e);
            wx.navigateTo({
                  url: '../personal/personal?user='+user_id+'&curUser='+this.data.user_id
            })
      },

      /**
       * 动态详情页
       */
      toDetail: function (e) {
            var topic_id = e.currentTarget.id;
            wx.navigateTo({
                  url: '../topic/topic?topic='+topic_id+'&user='+this.data.user_id,
                  success: (res) => {
                        console.log(res)
                  },
                  fail: (err) => {
                        console.log(err)
                  }
            })
      },

      /**
       * 跳转至个人主页
       */
      toPersonalAll: function () {
            var that = this;
            if (this.data.user_id !== app.tourist_flag){
                  wx.navigateTo({
                        url: '../personalAll/personalAll?user='+this.data.user_id,
                  })
            }
            else {
                  wx.showModal({
                        title: '注册',
                        content: '您现在使用的是游客模式，不能查看个人信息，要注册吗？',
                        success (res) {
                          if (res.confirm) {
                              that.setData({
                                    hideModal: false
                              })
                          }
                        }
                  })
            }
      },

      /**
       * 跳转至话题编辑页面
       */
      toEditTopic: function (e) {
            var that = this
            wx.showLoading()
            if (this.data.user_id === app.tourist_flag){
                  wx.hideLoading()
                  wx.showModal({
                        title: '注册',
                        content: '您现在使用的是游客模式，不能进行点赞，要注册吗？',
                        success (res) {
                          if (res.confirm) {
                              that.setData({
                                    hideModal: false
                              })
                          }
                        }
                  })
            }

            else{
                  wx.hideLoading()
                  wx.navigateTo({
                        url: '../editTopic/editTopic?user='+this.data.user_id+'&mode='+e.currentTarget.dataset.mode,
                  })
            }
      },

      /**
       * 
       */
      back: function (e) {
            console.log(e)
            console.log('back')
      },

      index: function (e) {
            console.log(e)
            console.log('index')
      },

      registerOnChange: function(e){
            // console.log(e);
            // this.setData({
            //       resgisterName: e.detail.value
            // });
            this.registerName = e.detail.value;
            // console.log(this.registerName);
      },

      register: function(e){
            var that = this;
            // console.log('注册!');
            this.setData({
                  registerModal: true
            });
            // console.log(this.registerName);
            // wx.showToast({
            //   title: '注册成功',
            // })
            wx.cloud.callFunction({
                  name: 'register_user',
                  data: {
                        open_id: that.data.currentOpenid,
                        name: that.registerName
                  },
                  success: res=>{
                        wx.showToast({
                          title: '注册成功',
                          duration: 1500,
                          complete: res=>{
                                that.onLoad();
                        }
                        })
                  },
                  fail: err=>{
                        wx.showToast({
                          title: '注册失败',
                          icon: 'none'
                        })
                        console.log(err);
                        that.onLoad();
                  }
            })
      },

      addTopicLike: function(e){
            // console.log(this.data.user_id, app.tourist_flag)

            var that = this;

            if (this.data.user_id !== app.tourist_flag){
                  var idx = e.target.dataset.idx;
                  var icon_field_name = 'feed['+idx+']liked';
                  var likenum_field_name = 'feed['+idx+']like_num';
                  var like_num = this.data.feed[idx].like_num;
                  if (this.data.feed[idx].liked){
                        wx.showToast({
                        title: '您已经点过赞啦！',
                        icon: 'none'
                        });
                  }
                  else {
                        app.utils.data.addTopicLike(e.currentTarget.id, this.data.user_id,
                        ()=>{
                              that.setData({
                                    [icon_field_name]: true,
                                    [likenum_field_name]: like_num+1
                              })
                        })
                  }
            }
            else {
                  wx.showModal({
                        title: '注册',
                        content: '您现在使用的是游客模式，不能进行点赞，要注册吗？',
                        success (res) {
                          if (res.confirm) {
                              that.setData({
                                    hideModal: false
                              })
                          }
                        }
                  })

            }
      },

      useTourist: function(){
            this.setData({
                  user_id: app.tourist_flag,
                  registerModal: true
            })
            this.showIndexContent()
      },

      /**
       * 预览照片
       */
      previewImg: function (e) {
            var that = this
            var picUrl = e.currentTarget.dataset.url
            var picUrls = []
            var picsIndex = e.currentTarget.dataset.picindex
            var feed = this.data.feed[picsIndex].pictures
            for (var i in feed) {
                  picUrls.push(feed[i].tempFileURL)
            }
            wx.previewImage({
                  current: picUrl,
                  urls: picUrls
            })
      },

      search: function(e){
            var keyword = e.detail.value
            if (keyword == ''){
                  keyword = null
            }
            wx.showLoading({
              title: '搜索中',
            })
            // 发起搜索时，将当前页数重置为0
            this.setData({
                  currentPage: 0
            })
            this.showIndexContent(keyword)
      },

      loadMore: function(e) {
            var that = this
            wx.showLoading()
            this.setData({
                  currentPage: this.data.currentPage + 1
            })
            wx.cloud.callFunction({
                  name: "index_user_info",
                  data: {
                        user_id: this.data.user_id,
                        page: this.data.currentPage,
                        keyword: null
                  },
                  success: res=>{
                        var list = res.result.list
                        var listLength = res.result.list.length
                        if (listLength === 0) {
                              wx.showToast({
                                title: '暂无更多内容',
                                icon: 'none'
                              })
                              return
                        }
                        var feed = this.data.feed
                        for (var i in list) {
                              feed.push(list[i])
                        }
                        console.log(feed)
                        that.setData({
                              feed: feed,
                              feed_length: this.data.feed_length + listLength
                        });
                        var length = that.data.feed_length
                        var list = that.data.feed
                        for (let i = listLength; i < length; i++) {
                              var thisPictures = util.objToArray(list[i].pictures)
                              wx.cloud.getTempFileURL({
                                    fileList: thisPictures,
                                    success: res => {
                                          var fileList = res.fileList
                                          var picturesName = 'feed[' + i + '].pictures'
                                          that.setData({
                                                [picturesName]: fileList
                                          })
                                    }
                              })
                        }
                        wx.hideLoading({})
                        that.setData({
                              refresher: false
                        })
                  }
            });
      },

      /**
       * 刷新触发
       */
      refresh: function (e) {
            this.setData({
                  currentPage: 0
            })
            this.onLoad()
      }
})