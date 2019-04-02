import tensorflow as tf

# Analysis_01과 로직은 같으나, [tf.placehoder]를 사용하여 만들어진 모델에 관해서 값을 넘겨 줄 수 있다.

X = tf.placeholder(tf.float32)
Y = tf.placeholder(tf.float32)

# 가중치(w) / 바이어스(b)
w = tf.Variable(tf.random_normal([1]), name='weight')
b = tf.Variable(tf.random_normal([1]), name='bias')

# 예측값 구해보기 - 예측 값이 아래와 같은 공식으로 이루어지는 값으로 되기 위해서는 대략 w : 1에 가까워야 하고, b : 1.1에 가까워야 한다.
hypothesis = X * w + b

# 오차 확인
cost = tf.reduce_mean(tf.square(hypothesis - Y))

# 최소화 하기 학습 ?
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.01)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.global_variables_initializer())

# 패턴이 (feed_dict) X:1 = Y:2.1 / X:2=Y:3.1 에 매핑 되어야 할 때
for step in range(2001):
    cost_val, W_val, b_val, _ = sess.run([cost, w, b, train],
                                         feed_dict={X: [1, 2, 3, 4, 5], Y: [2.1, 3.1, 4.1, 5.1, 6.1]
                                         })
    if step % 20 == 0:
        print(step, cost_val, W_val, b_val)

print(sess.run(hypothesis, feed_dict={X: [5]}))
print(sess.run(hypothesis, feed_dict={X: [1.5, 3.5]}))