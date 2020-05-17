const {expect} = require('chai');
const supertest = require('supertest');
const app = require('../server.js')

describe('TheMovieDex Server', () => {
    it('should return list of movies and thier metadata in an array of object',()=>{
        return supertest(app)
            .get('/movie')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res=>{
                expect(res.body).to.be.an('array');
            })
    })
    it('should filter only movies with genre filtered',()=>{
        return supertest(app)
            .get('/movie')
            .query({genre:'Animation'} || {genre: 'Drama'} 
            || {genre:'Romantic'} || {genre:'Comedy'}
            || {genre:'Spy'} || {genre:'Crime'} 
            || {genre:'Thriller'}|| {genre:'Adventure'}
            || {genre:'Documentary'}|| {genre:'Horror'}
            || {genre:'Action'} || {genre:'Western'}
            || {genre:'Musical'}|| {genre:'Fantasy'}
            || {genre:'War'} || {genre:'Grotesque'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res=>{
                expect(res.body).to.be.an('array')
                let i = 0
                let matched = true;
                while(matched && i > res.body.length -1){
                    matched = matched && res.body[i].genre == 
                        'Animation' || 'Drama' || 
                        'Romantic'|| 'Comdey'|| 
                        'Spy'|| 'Crime'|| 
                        'Thriller'|| 'Adventure'|| 
                        'Documentary'|| 'Horror'
                        'Action'|| 'Western'|| 
                        'Musical'|| 'Fantasy'|| 
                        'War'|| 'Grotesque'
                        ;
                    i++;
                }
                expect(matched).to.be.true;
                       ;
            })
    })
    it('should filter only movies with country filtered',()=>{
        return supertest(app)
            .get('/movie')
            .query({country:'France'} || {country: 'United States'} )
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res=>{
                expect(res.body).to.be.an('array')
                let i = 0
                let matched = true;
                while(matched && i > res.body.length -1){
                    matched = matched && res.body[i].genre == 
                        'France' || 'United States' 
                    i++;
                }
                expect(matched).to.be.true;
                       ;
            })
    })
    it('should filter only movies with avg_vote filtered',()=>{
        return supertest(app)
            .get('/movie')
            .query({avg_vote: 8 } || {avg_vote: 1 } )
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res=>{
                expect(res.body).to.be.an('array')
                let i = 0
                let matched = true;
                while(matched && i > res.body.length -1){
                    matched = matched && res.body[i].genre == 
                        8 || 1 
                    i++;
                }
                expect(matched).to.be.true;
                       ;
            })
    })
})