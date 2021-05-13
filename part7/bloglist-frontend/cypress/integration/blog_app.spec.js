let blogs = []

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'

        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('login')
    })

    it('Login form can be opened', function () {
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
    })

    it('user can log in', function () {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()

        cy.contains('Matti Luukkainen logged in')
    })

    it('login fails with wrong password', function () {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('blablabla')
        cy.get('#login-button').click()

        //cy.get('.error').contains('Wrong username or password')
        cy.get('.error')
            .should('contain', 'Wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })

    describe('When logged in', function () {

        beforeEach(function () {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        it('a new blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('Psychedelic adventure')
            cy.get('#author').type('Joe Rogan')
            cy.get('#url').type('www.thejoeroganexperience.org')
            cy.get('#create-blog-button').click()

            cy.contains('Psychedelic adventure')
        })

        describe('and a blog exist', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'Have you ever tried DMT?',
                    author: 'Joe Rogan',
                    url: 'www.thejoeroganexperience.org'
                })
            })

            it('user can like a blog', function () {
                cy.contains('Have you ever tried DMT?')
                    .contains('view')
                    .click()

                cy.get('#likeBtn').click()

                cy.get('#likes')
                    .contains('1')
            })

            it('user can delete a blog', function () {
                cy.get('.basicContent').contains('view').click()

                cy.get('#deleteBlogBtn').click()

                cy.get('html').should('not.contain', 'Have you ever tried DMT?')
            })

            it('other users cannot delete a blog', function () {
                // Log out as previous user
                cy.get('#logout-button').click()

                // Add user to the DB
                const user = {
                    name: 'Jacek Placek',
                    username: 'jacko',
                    password: 'placko'

                }
                cy.request('POST', 'http://localhost:3003/api/users/', user)

                // Login as the Jacek Placek
                cy.login({ username: 'jacko', password: 'placko' })

                cy.contains('Have you ever tried DMT?')
                    .contains('view')
                    .click()


                cy.get('.fullContent').should('not.contain', '#deleteBlogBtn')
            })

            describe('3 blogs exists', function () {
                beforeEach(function () {
                    cy.createBlog({
                        title: 'Masvidal versus Usman 2 predictions',
                        author: 'Michael Bisping',
                        url: 'www.mmajunkies.com',
                        likes: 5
                    })
                    cy.createBlog({
                        title: 'Why Singapore its great country to emigrate to',
                        author: 'Joe Blow',
                        url: 'www.programmersforum.com',
                        likes: 10
                    })

                    cy.request('GET', 'http://localhost:3003/api/blogs')
                        .then(returnedBlogs => {
                            returnedBlogs.body.map(blog => blogs = blogs.concat(blog))
                        })
                })

                it('Blogs are ordered correctly based on number of likes (highest to lowest)', function () {
                    //console.log(blogs)
                    // At first click 'view' in all blogs, to display full information about them
                    cy.get('.basicContent').each((blog) => cy.contains('view').click())

                    // Then check if they are ordered correctly
                    cy.get('.blog').each((blog,i) => {
                        if(i === 0) {
                            cy.contains('likes: 10')
                        } else if (i === 1) {
                            cy.contains('likes: 5')
                        } else if (i === 2) {
                            cy.contains('likes: 0')
                        }
                    })
                })
            })
        })


    })
})