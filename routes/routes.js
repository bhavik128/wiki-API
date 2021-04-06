const express = require('express');
const app = express.Router();

//models
const Article = require('../models/articles');

//route for all articles
app.route("/articles")

    .get((req, res) => {
        Article.find({},(err,articles) => {
            if(err) res.send(err);
            res.send(articles);
        });
    })

    .post((req, res) => {
        const {title,content} = req.body;

        const article = new Article({title:title,content:content});

        article.save(err => {
            if(err) res.send(err);
            else res.send({
                message:"article created successfully!!"
            });
        });
    })

    .delete((req, res) => {
        Article.deleteMany({},null,(err) => {
            if(err) res.send(err);
            else res.send({
                message:"All articles deleted successfully!!"
            });
        });
    });



//route for specific article
app.route("/articles/:title")

    .get((req, res) => {
        const title = req.params.title;
        Article.findOne({title:title},null,null,(err,article) => {
            if(err) res.send(err);

            if(!article) res.send({
                message:"Article not found!"
            });
            else res.send(article);
        });
    })

    .put((req, res) => {
        const title = req.params.title;
        const newTitle = req.body.title;
        const newContent = req.body.content;

        Article.findOneAndUpdate({title:title},{title:newTitle,content:newContent},{overwrite:true,useFindAndModify:false},(err,article) => {
            if(err) res.send(err);

            if(!article) res.send({
                message:"Article not found!"
            });
            else {
                res.send({
                    message: "Article updated successfully!!"
                });
            }
        });
    })

    .patch((req, res) => {
        const title = req.params.title;

        Article.findOneAndUpdate({title:title},{$set:req.body}, {useFindAndModify:false},(err,article) => {
            if(err) res.send(err);

            if(!article) res.send({
                message:"Article not found!"
            });
            else {
                res.send({
                    message: "Article updated successfully!!"
                });
            }
        });
    })

    .delete((req, res) => {
        const title = req.params.title;

        Article.findOneAndDelete({title:title},null,(err,article) => {
            if(err) res.send(err);

            if(!article) res.send({
                message:"Article not found!"
            });
            else {
                res.send({
                    message:"Article deleted successfully!!"
                });
            }
        });
    });



module.exports = app;