const express = require('express');
const crypto = require('crypto');
const { addSeconds } = require('date-fns');
const Oauth = require('../model/oauth.model');
const OauthTokens = require('../model/oauth_tokens.model');

module.exports.generateToken = (async(req, res, next) => {
    const { client_id, client_secret } = req.body;
    if (!client_id || !client_secret) {
        return res.status(400).send({
            error: 'Invalid request'
        })
    }

    const oauth = await Oauth.findOne({
        client_id: client_id,
        client_secret: client_secret
    })

    if (!oauth) {
        return res.status(401).send({
            error: 'Invalid credentials'
        })
    }

    const token = await OauthTokens.create({
        issuer: oauth._id,
        token: crypto.randomBytes(64).toString('hex'),
        expires_at: new Date(Date.now() + 10 * 60 * 1000)
    })

    res.send({
        access_token: token.token,
        expires_in: token.expires_at,
    })
})
