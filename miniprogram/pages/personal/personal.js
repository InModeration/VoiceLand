// miniprogram/pages/personal/personal.js
var app = getApp()
Page({

      /**
       * 页面的初始数据
       */
      data: {
            userInfo: {},
            backgroundImage: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/background/default/default-1.jpg?sign=d366479029f07f9b85c2804f1cd98724&t=1587886069',
            like_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/like.png?sign=f385b6a9ec6bd2fd8eef4c15dd7f60e0&t=1587886758',
            comment_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/comment%20.png?sign=1d444df91712179f1bbcc3fcbdde87eb&t=1587886769',
            camera_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/camera.png?sign=d102a3e17157cf4dd3966a02ba01a648&t=1587886776',
            more_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/more.png?sign=83161b2337cd14966522d1ae7b7fe7ea&t=1587887690',
            back_url: 'https://766f-voice-land-qcrwm-1301811369.tcb.qcloud.la/assets/image/icon/back.png?sign=e77d67c342931895f0b2e75543930c5c&t=1588416063',
            hideModal: true,
            showNickname: 'none',
            refresher: false,
            currentPage: 0
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
            wx.showLoading({
                  mask: true
            })
            var that = this;

            var user_id = options.user;
            var cur_user_id = options.curUser;
            // console.log('host: '+host);

            this.setData({
                  user_id: user_id,
                  cur_user_id: cur_user_id
            });

            wx.cloud.callFunction({
                  name: 'userinfo',
                  data: {
                        user_id: this.data.user_id
                  },
                  success: res=>{
                        // test
                        // console.log(res)
                        var data = res.result.data[0];
                        that.setData({
                              name: data.name,
                              avatar: data.avatar,
                              sex: data.sex,
                              region: data.region,
                              id: data._id,
                              cover: data.cover,
                              motto: data.motto
                        });
                  },
                  fail: err=>{
                        console.log(err);
                  }
            });

            console.log(this.data.user_id)
            wx.cloud.callFunction({
                  name: 'user_topic_count',
                  data: {
                        user_id: this.data.user_id
                  },
                  success: res=>{
                        // console.log(res)
                        that.setData({
                              topic_count: res.result.total
                        })
                  },
                  fail: err=>{
                        console.log(err)
                  }
            });

            wx.cloud.callFunction({
                  name: 'user_topic',
                  data: {
                        user_id: this.data.user_id,
                        page: this.data.currentPage
                  },
                  success: res=>{
                        // test
                        // console.log(res);
                        var topics = res.result.list
                        var topicsLength = topics.length
                        that.setData({
                              topics: topics,
                              topicsLength: topicsLength
                        });
                        for (let i = 0; i < topicsLength; i++) {
                              var thisPictures = topics[i].pictures
                              wx.cloud.getTempFileURL({
                                    fileList: thisPictures,
                                    success: res => {
                                          var filelist = res.fileList
                                          var name = 'topics[' + i + '].pictures'
                                          that.setData({
                                                [name]: filelist
                                          })
                                    }
                              })
                        }
                  },
                  fail: err=>{
                        console.log(err);
                  },
                  complete: res => {
                        // console.log(that.data)
                  }
            });

            // 获取本人的信息，以查看该用户是否已经关心
            if (cur_user_id != app.tourist_flag){
                  wx.cloud.callFunction({
                        name: 'userinfo',
                        data: {
                              user_id: cur_user_id
                        },
                        success: res=>{
                              that.setData({
                                    concern: res.result.data[0].concern,
                                    in_my_concern: res.result.data[0].concern.indexOf(user_id) != -1      // 该用户是否已经在我的关心列表内
                              })
                        },
                        fail: err=>{
                              console.log(err)
                        },
                        complete: res => {
                              wx.hideLoading()
                              that.setData({
                                    refresher: false
                              })
                        }
                  });
            }
            
            //调用应用实例的方法获取全局数据
            // app.getUserInfo(function(userInfo) {
            //       console.log(userInfo)
            //       //更新数据
            //       that.setData({
            //             userInfo: userInfo,
            //       })
            // })
            // console.log(app)
      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function() {

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function() {

      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function() {

      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function() {

      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function() {

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function() {

      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function() {

      },

      /**
      * 动态详情页
      */
      toDetail: function (e) {
            wx.navigateTo({
                  url: '../topic/topic?user='+this.data.cur_user_id+'&topic='+e.currentTarget.id
            })
      },
      displayNickname: function (e) {
            var scrollTop = e.detail.scrollTop
            if (scrollTop >= 150)
                  this.setData({
                        showNickname: ''
                  })
            else
                  this.setData({
                        showNickname: 'none'
                  })
      },

      editInfo: function(e){
            if (this.data.user_id == this.data.cur_user_id){
                  wx.navigateTo({
                        url: '../editinfo/editinfo?user='+this.data.cur_user_id,
                  })
            }
      },

      /**
       * 返回至上一页面
       */
      backLast: function () {
            wx.navigateBack({
                  delta: 1
            })
      },

      addConcern: function(){
            var that = this;

            // console.log(this.data.cur_user_id)

            if (this.data.cur_user_id === app.tourist_flag){
                  wx.showModal({
                        title: '注册',
                        content: '您现在使用的是游客模式，不能进行关心，要注册吗？',
                        success (res) {
                          if (res.confirm) {
                              that.setData({
                                    hideModal: false
                              })
                          }
                        }
                  })
            }

            else {
                  app.utils.data.addConcern(this.data.user_id, this.data.cur_user_id, 
                        ()=>{
                              that.data.concern.push(that.data.user_id);
                              that.setData({
                                    in_my_concern: true
                              })
                  })
            }
      },

      removeConcern: function(){
            var that = this;
            app.utils.data.removeConcern(this.data.user_id, this.data.cur_user_id, 
                  ()=>{
                        delete that.data.concern[that.data.concern.indexOf(this.data.user_id)];
                        that.setData({
                              in_my_concern: false
                        })
                  })
      },

      /**
       * 预览照片
       */
      previewImg: function (e) {
            var picUrl = e.currentTarget.dataset.url
            var picUrls = []
            var picsIndex = e.currentTarget.dataset.picindex
            var pictures = this.data.topics[picsIndex].pictures
            for (var i in pictures) {
                  picUrls.push(pictures[i].tempFileURL)
            }
            wx.previewImage({
                  current: picUrl,
                  urls: picUrls
            })
      },

      /**
       * 刷新触发
       */
      refresh: function (e) {
            this.setData({
                  currentPage: 0
            })
            this.onLoad({
                  user: this.data.user_id,
                  curUser: this.data.user_id
            })
      },

      /**
       * 加载更多
       */
      loadMore: function (e) {
            if (this.data.topic_count === this.data.topicsLength) {
                  wx.showToast({
                    title: '到底啦!~',
                    icon: 'none',
                    mask: true
                  })
                  return 
            }
            var that = this
            wx.showLoading({
                  mask: true
            })
            this.setData({
                  currentPage: this.data.currentPage + 1
            })
            wx.cloud.callFunction({
                  name: 'user_topic',
                  data: {
                        user_id: this.data.user_id,
                        page: this.data.currentPage
                  },
                  success: res=>{
                        // test
                        // console.log(res);
                        var topics = res.result.list
                        var topicsLength = topics.length
                        var newtopics = that.data.topics
                        for (var i in topics) {
                              newtopics.push(topics[i])
                        }
                        that.setData({
                              topics: newtopics,
                              topicsLength: that.data.topicsLength + topicsLength
                        });
                        var length = that.data.topicsLength
                        for (let i = topicsLength; i < length; i++) {
                              var thisPictures = newtopics[i].pictures
                              wx.cloud.getTempFileURL({
                                    fileList: thisPictures,
                                    success: res => {
                                          var filelist = res.fileList
                                          var name = 'topics[' + i + '].pictures'
                                          that.setData({
                                                [name]: filelist
                                          })
                                    }
                              })
                        }
                  },
                  fail: err=>{
                        console.log(err);
                  },
                  complete: res => {
                        console.log(that.data)
                        wx.hideLoading({})
                        that.setData({
                              refresher: false
                        })
                  }
            });
      },

      // 测试接口用
      removeTopic: function(e){
            // console.log(this.data.topics)
            var that = this
            wx.cloud.callFunction({
                  name: 'remove_topic',
                  data: {
                        topic_id: this.data.topics[0]._id
                  },
                  success: res=>{
                        console.log(res)
                        // that.onLoad()
                  },
                  fail: err=>{
                        console.log(err)
                  }
            })
      }
})