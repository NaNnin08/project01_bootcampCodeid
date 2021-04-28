import server from '../server/server'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { response } from 'express';

// Assertion 
chai.should();
chai.use(chaiHttp);

describe('region APIs', () => {
    // get all users
    describe("Test GET route /api/users", () => {

        it("It should return all users", (done) => {
           
            chai.request(server)
                .get("/api/users/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.not.be.eq(0);
                    done();
                });

        });

        // negative test
        it("It should not return all regions", (done) => {
            chai.request(server)
                .get("/api/user/")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

    });

    //get users by id
    describe('get /api/users/:id', () => {

        it('It should GET a regions by ID', (done) => {
            const id = 1;
            chai.request(server)
                .get('/api/users/' + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('user_id');
                    response.body.should.have.property('user_name');
                    response.body.should.have.property('user_id').eq(1);
                    done();
                });
        });

        it('It should Not GET a regions by ID', (done) => {
            const id = 1;
            chai.request(server)
                .get('/api/users' + id)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.contains('html');
                    done();
                });
        });
    });
});