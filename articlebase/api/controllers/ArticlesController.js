/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    loadArticleList:(req,res)=>{
        Articles.find({}).exec(function(err, articles){
            if(err){
                res.send(500, {error:'Database Error'});
            } else{
                return res.view('list',{articles});
            }
        })
    },
    addArticle:(req,res)=>{
        return res.view('add');
    },
    create:(req,res)=>{
        const { title,body } = req.body;
        
        Articles.create({
            title,
            body
        }).exec((err)=>{
            if (err){
                res.send(500, {error:'Database Error'});
            }
            res.redirect('/articles/list');
        });
    }
};

