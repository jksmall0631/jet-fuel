const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../server.js');

chai.use(chaiHttp);

describe('Server', () => {
  it('should exist', () => {
    expect(app).to.exist;
  });
});

describe('GET /', function() {
  it('should return a 200 and html', function(done) {
    chai.request(app)
    .get('/')
    .end(function(err, res) {
      if(err) { done(err); }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      done();
    });
  });
});

describe('GET /api/folders', function() {
  beforeEach(function(done){
  const folders = [{name: 'cat vids'},
                  {name: 'recipes'},
                  {name: 'farmers only dating sites'}]
  app.locals.folders = folders;
  done();
});

afterEach(function(done){
  app.locals.folders = [];
  done();
});

it('should return all folders', function(done) {
      chai.request(app)
      .get('/api/folders')
      .end(function(err, res) {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(3);
        expect(res.body[0]).to.have.property('name');
        done();
      });
    });
  });

  describe('POST /api/folders', function () {
        afterEach(function(done) {
          app.locals.folders = [];
          done();
        });

        it('should add a new folder', function(done) {
        chai.request(app)
        .post('/api/folders')
        .send({ name: 'Dr. Phil fan fiction' })
        .end(function(err, res) {
          if(err) { done(err); }
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('name');
          done();
        });
      });
    });

describe('GET /api/folders/:folderId', function() {
  beforeEach(function(done){
    const folders = [{name: 'baby duck pic        collection', id: 1},
    {name: 'travel blogs', id: 2}];
    app.locals.folders = folders;
      done();
});

  afterEach(function(done){
    app.locals.folders = [];
      done();
  });

  context('if folder is valid', function(){
    it('should display list of urls',     function(done) {
      chai.request(app)
       .post('/api/folders')
       .send({ name: 'url1'})
       .end(function(err, res) {
         console.log('l');
         if (err) { done(err); }
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.be.a('object');
         expect(res.body).to.have.property('name');
         done();
       });
    });
  });

  describe('POST /api/folders/:folderId', function() {
    afterEach(function(done) {
      app.locals.urls= [{ date: 03-15-17, url: 'url', folderId: 'Y39kn3', id: 5}];
      done();
    });

    it('should add a new url', function(done) {
    chai.request(app)
    .post('/api/folders/:folderId')
    .send({ url: 'url' })
    .end(function(err, res) {
      if(err) { done(err); }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('url');
      expect(res.body.url).to.equal('url');
      done();
    });
  });
});
});
