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
    // My Controller for the POST Request
    create: async (req,res)=>{
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
    },
    // Delete Blog
    delete: (req,res) =>{
        Articles.destroy({id:req.params.id}).exec((err)=>{
            if(err){
                res.send(500, {error:'Database Error'})
            }

            res.redirect('/articles/list')
        });

        return false;
    },
    // Edit Blog
    edit: (req,res) =>{
        Articles.findOne({id:req.params.id}).exec((err,article)=>{
            if(err){
                res.send(500, {error:'Database Error'});
            }

            return res.view('edit',{article});
        })
    },
    // Update
    update:(req,res)=>{
        const { title,body } = req.body;
        
        Articles.update({id:req.params.id},{
            title,
            body
        }).exec((err)=>{
            if (err){
                res.send(500, {error:'Database Error'});
            }
            res.redirect('/articles/list');
        });

        return false;
    }
};

