import flask
import pandas as pd



def create_app():
    app = flask.Flask(__name__)
    app.config['DEBUG'] = True;

    if app.config["DEBUG"]:
        @app.after_request
        def after_request(response):
            response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
            response.headers["Expires"] = 0
            response.headers["Pragma"] = "no-cache"
            return response

    # @app.route('/', methods=['GET', 'POST'])
    # def index():
    #     """
    #     Index page view handler.
    #     :return: rendered index.html template
    #     """
    #     return flask.render_template('index.html')

    @app.route('/')
    def index():
        """
        Data view handler
        :return: JSON object of the data CSV file
        """
        data = pd.read_csv('task_data.csv')

        context = {
            'sensor_data': data.to_dict(orient='list')
        }

        return flask.render_template('index.html',context=context)

    return app


if __name__ == "__main__":
    app = create_app()
    # serve the application on port 7410
    app.run(host='0.0.0.0', port=7410)
