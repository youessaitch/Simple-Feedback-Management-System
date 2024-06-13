const fs = require('fs');

const feedbacks = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/feedbacks.json`)
);

exports.checkId = (req, res, next, val)=>{
    // console.log(`tour id is ${val}`);
    const feedback = feedbacks.find(el => el.name === (req.params.name));
    if(feedback === undefined){
        return res.status(404).json({
            status : 'fail',
            message : 'Person Not found',
        });
    }
    next();
}

exports.checkBody = (req, res, next)=>{
    const name = req.body.name
    const feedback = req.body.feedback
    if(!name || !feedback){
        return res.status(400).json({ 
            status : 'fail',
            message : 'bad request, missing feedback or name',
        });
    }
    next();
}

exports.getAllFeedbacks = (req, res)=>{
    console.log("requested at", new Date().toLocaleString());
    res.status(200).json({
        status : 'success',
        requestedAt : req.requestTime,
        results : feedbacks.length, 
        data : {
            feedbacks
        } 
    })
};

exports.createFeedback = (req, res)=>{
    // console.log(req.body);
    const newFeedback = Object.assign(req.body );
    feedbacks.push(newFeedback);
    fs.writeFile('./dev-data/data/feedbacks.json', JSON.stringify(feedbacks), err=>{
        res.status(201).json({
            status : "success",
            data : {
                feedback : newFeedback
            }
        })
    })
    
}
