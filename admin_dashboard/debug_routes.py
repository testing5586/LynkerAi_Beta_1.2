
@app.route('/test_alive')
def test_alive():
    return "Server is alive!"

@app.route('/debug_login')
def debug_login():
    try:
        return render_template('auth/login.html')
    except Exception as e:
        return f"Template Error: {e}"
