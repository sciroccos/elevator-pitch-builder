/*! elevator-pitch-builder 2014-12-25 */
this.Handlebars=this.Handlebars||{},this.Handlebars.Templates=this.Handlebars.Templates||{},this.Handlebars.Templates["component-tpl"]=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f=this.lambda,g=this.escapeExpression;return'<a href="#'+g(f(null!=(e=null!=a?a.component:a)?e.name:e,a))+'"><h1 class="name">'+g(f(null!=(e=null!=a?a.component:a)?e.name:e,a))+'</h1></a>\n\n<div class="content">\n  <h2 class="label">'+g(f(null!=(e=null!=a?a.component:a)?e.label:e,a))+'</h2>\n\n  <div class="component-text-wrapper">\n    <textarea name="'+g(f(null!=(e=null!=a?a.component:a)?e.name:e,a))+'-text" class="component-text">'+g(b.lookup.call(a,null!=a?a.pitch:a,null!=(e=null!=a?a.component:a)?e.name:e,{name:"lookup",hash:{},data:d}))+'</textarea>\n  </div>\n\n  <p class="help animated expanded">'+g(f(null!=(e=null!=a?a.component:a)?e.help:e,a))+"</p>\n\n</div>"},useData:!0}),this.Handlebars.Templates["intro-tpl"]=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return"<h1>The Art of Pitchcraft</h1>\n\n<p>Whether you are trying to raise capital, promote your company, or promote yourself, it's essential to have an elevator pitch. You need to communicate your main message quickly, clearly, and distinctly to someone who doesn't even know you. A good pitch takes planning and practive to deliver it quickly, on the spot, and under pressure.</p>\n\n<p>You have <em>one minute</em> to say it all.</p>\n\n<a href=\"#who\">Start crafting your pitch</a>\n"},useData:!0}),this.Handlebars.Templates["review-tpl"]=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a){var b,c=this.lambda,d=this.escapeExpression;return'<a href="#review"><h1 class="name">Review your pitch</h1>\n<h2 class="label">Your Created Pitch</h2>\n\n<div class="review">\n  <p class="pitch-review">\n    <span class="pitch-who">'+d(c(null!=(b=null!=a?a.pitch:a)?b.who:b,a))+'</span>\n    <span class="pitch-who">'+d(c(null!=(b=null!=a?a.pitch:a)?b.what:b,a))+'</span>\n    <span class="pitch-who">'+d(c(null!=(b=null!=a?a.pitch:a)?b.why:b,a))+'</span>\n    <span class="pitch-who">'+d(c(null!=(b=null!=a?a.pitch:a)?b.goal:b,a))+'</span>\n  </p>\n\n  <p class="review-help">Be passionate. Listeners may be impressed by your business logic but your excitement will create an even stronger impact. ... Be careful not to turn it into a memorized monologue. You shouldn\'t sound like you are reciting a word-for-word speech. Otherwise your audience won\'t feel special. You are having a conversation (albeit a targeted one), not delivering a sermon.</p>\n</div>\n\n<div class="analyze">\n</div>'},useData:!0});var Pitch=Pitch||{};!function(){Pitch.Router=Backbone.Router.extend({routes:{"":"introRoute",review:"pitchReviewRoute",":component":"pitchComponentRoute"}})}();var Pitch=Pitch||{};!function(){"use strict";Pitch.PitchModel=Backbone.Model.extend({})}();var Pitch=Pitch||{};!function(){"use strict";Pitch.TemplateView=Backbone.View.extend({initialize:function(a){a=a||{},this.setTemplate(a.template)},setTemplate:function(a){if(_.isString(a))this.template=Handlebars.Templates[a];else{if(!_.isFunction(a))throw"template must be a template name or a function.";this.template=a}},getTemplateData:function(){var a={};return a},render:function(){var a=this.getTemplateData(),b=this.template(a);return this.$el.html(b),this}})}();var Pitch=Pitch||{};!function(){"use strict";Pitch.PitchComponentView=Pitch.TemplateView.extend({initialize:function(a){a=a||{},this.pitchcomponentdata=a.component,this.setTemplate(a.template),this.$el.on("click",".help",_.bind(this.handleHelpClick,this))},getTemplateData:function(){var a={};return a.pitch=this.model.toJSON(),a.component=this.pitchcomponentdata,a},handleHelpClick:function(){this.$(".help").toggleClass("expanded collapsed")}})}();var Pitch=Pitch||{};!function(){"use strict";Pitch.PitchReviewView=Pitch.TemplateView.extend({getTemplateData:function(){var a={};return a.pitch=this.model.toJSON(),a.component=this.pitchcomponentdata,a}})}();var Pitch=Pitch||{};!function(){"use strict";Pitch.App=function(a){this.$baseEl=$(a),this.router=new Pitch.Router,this.router.on("route:introRoute",_.bind(this.handleIntroRoute,this)),this.router.on("route:pitchComponentRoute",_.bind(this.handleComponentRoute,this)),this.router.on("route:pitchReviewRoute",_.bind(this.handleReviewRoute,this)),this.router.on("route",_.bind(this.handleRoute,this)),this.$(".intro-section").html(Handlebars.Templates["intro-tpl"]()),this.pitch=this.initializePitchModel(),this.whoView=this.buildPitchComponentView("who").render(),this.whatView=this.buildPitchComponentView("what").render(),this.whyView=this.buildPitchComponentView("why").render(),this.goalView=this.buildPitchComponentView("goal").render(),this.reviewView=this.buildPitchReviewView().render()},Pitch.App.prototype={$:function(a){return this.$baseEl.find(a)},initializeSectionAnimations:function(){this.$("section").addClass("animated"),this.animationsInitialized=!0},initializePitchModel:function(){return new Pitch.PitchModel({})},buildPitchComponentView:function(a){var b,c;return c=$("."+a+"-section"),b=new Pitch.PitchComponentView({el:c,model:this.pitch,template:Handlebars.Templates[a+"-tpl"]||Handlebars.Templates["component-tpl"],component:{name:c.attr("data-name"),label:c.attr("data-label"),help:c.attr("data-help")}})},buildPitchReviewView:function(){var a,b;return b=$(".review-section"),a=new Pitch.PitchReviewView({el:b,model:this.pitch,template:Handlebars.Templates["review-tpl"]})},showIntroSection:function(){this.$(".intro-section").removeClass("offscreen").addClass("onscreen")},hideIntroSection:function(){this.$(".intro-section").removeClass("onscreen").addClass("offscreen")},hideAllPitchSections:function(){this.$(".pitch-container section").removeClass("expanded").addClass("collapsed")},showPitchSection:function(a){this.$("."+a+"-section").removeClass("collapsed").addClass("expanded")},handleRoute:function(){this.animationsInitialized||_.delay(_.bind(this.initializeSectionAnimations,this),300)},handleIntroRoute:function(){this.showIntroSection()},handleComponentRoute:function(a){this.hideIntroSection(),this.hideAllPitchSections(),this.showPitchSection(a)},handleReviewRoute:function(){this.hideIntroSection(),this.hideAllPitchSections(),this.showPitchSection("review")}}}();